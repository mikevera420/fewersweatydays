#!/usr/bin/env node
/**
 * Build-time prerender. Runs after `vite build` (client) and
 * `vite build --ssr src/entry-server.tsx` (server bundle in dist-ssr/).
 *
 * For every route (static pages + every post in content/posts) it renders the
 * React tree to HTML and writes dist/<route>/index.html with the real body
 * text and that page's own <title>, description, canonical and og/twitter
 * tags in <head>. React then hydrates it in the browser as before.
 * Also writes dist/404.html, which Vercel serves (with a 404 status) for any
 * path that has no file.
 */
import { readFileSync, writeFileSync, mkdirSync, rmSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const dist = join(root, 'dist');
const ssrDir = join(root, 'dist-ssr');

const { render, getRoutes } = await import(pathToFileURL(join(ssrDir, 'entry-server.js')).href);

const template = readFileSync(join(dist, 'index.html'), 'utf8')
  // Per-page tags replace the site-wide defaults.
  .replace(/\s*<title>[\s\S]*?<\/title>/, '')
  .replace(/\s*<meta name="description"[^>]*>/, '');

if (!template.includes('<div id="root"></div>')) {
  throw new Error('prerender: <div id="root"></div> not found in dist/index.html');
}

// React 19 emits <title>/<meta>/<link> from components as hoistable tags at
// the front of renderToString output. Move them into <head>.
const HEAD_TAG = /^(?:<title>[\s\S]*?<\/title>|<meta\b[^>]*\/?>|<link\b[^>]*\/?>)/;

function splitHead(html) {
  const head = [];
  let rest = html;
  for (;;) {
    const m = rest.match(HEAD_TAG);
    if (!m) break;
    head.push(m[0]);
    rest = rest.slice(m[0].length);
  }
  return { head: head.join('\n    '), body: rest };
}

// ScrollReveal/hero elements start at opacity 0 until JS animates them in.
// Without JS (some crawlers, reader modes) show them.
const NOSCRIPT =
  '<noscript><style>[style*="opacity:0;"]{opacity:1!important;transform:none!important}</style></noscript>';

function page(url) {
  const { head, body } = splitHead(render(url));
  if (!/<title>/.test(head)) throw new Error(`prerender: no <title> rendered for ${url}`);
  return template
    .replace('</head>', `    ${head}\n    ${NOSCRIPT}\n  </head>`)
    .replace('<div id="root"></div>', `<div id="root">${body}</div>`);
}

function outFile(url) {
  if (url === '/') return join(dist, 'index.html');
  return join(dist, url.replace(/^\//, ''), 'index.html');
}

const routes = getRoutes();
const seen = new Set();
for (const url of routes) {
  if (seen.has(url)) throw new Error(`prerender: duplicate route ${url}`);
  seen.add(url);
  const html = page(url);
  const file = outFile(url);
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html, 'utf8');
}

writeFileSync(join(dist, '404.html'), page('/__not-found__'), 'utf8');

rmSync(ssrDir, { recursive: true, force: true });
console.log(`Prerendered ${routes.length} routes + 404.html`);
