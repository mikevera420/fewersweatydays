#!/usr/bin/env node
/**
 * Generates public/sitemap.xml from content/posts/*.md frontmatter.
 * Same source of truth the app uses via src/lib/posts.ts.
 */
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const postsDir = join(root, 'content', 'posts');
const outPath = join(root, 'public', 'sitemap.xml');
const SITE = 'https://fewersweatydays.com';

function getFrontmatterField(raw, key) {
  const match = raw.match(new RegExp(`^${key}:\\s*(.*)$`, 'm'));
  if (!match) return '';
  return match[1].trim().replace(/^["']|["']$/g, '');
}

function escapeXml(s) {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

const files = readdirSync(postsDir).filter((f) => f.endsWith('.md'));
const posts = files
  .map((file) => {
    const raw = readFileSync(join(postsDir, file), 'utf8');
    const slug = getFrontmatterField(raw, 'slug');
    const date = getFrontmatterField(raw, 'date');
    if (!slug) return null;
    return { slug, date };
  })
  .filter(Boolean)
  .sort((a, b) => (b.date || '').localeCompare(a.date || ''));

const today = new Date().toISOString().slice(0, 10);

const staticUrls = [
  { loc: `${SITE}/`, lastmod: today, changefreq: 'weekly', priority: '1.0' },
  { loc: `${SITE}/blog`, lastmod: today, changefreq: 'weekly', priority: '0.9' },
  { loc: `${SITE}/about`, lastmod: today, changefreq: 'monthly', priority: '0.6' },
  { loc: `${SITE}/work-with-me`, lastmod: today, changefreq: 'monthly', priority: '0.7' },
];

const postUrls = posts.map((p) => ({
  loc: `${SITE}/blog/${p.slug}`,
  lastmod: p.date || today,
  changefreq: 'monthly',
  priority: '0.8',
}));

function urlEntry({ loc, lastmod, changefreq, priority }) {
  return `  <url>
    <loc>${escapeXml(loc)}</loc>
    <lastmod>${escapeXml(lastmod)}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
}

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${[...staticUrls, ...postUrls].map(urlEntry).join('\n')}
</urlset>
`;

writeFileSync(outPath, xml, 'utf8');
console.log(`Wrote ${outPath} (${staticUrls.length + postUrls.length} URLs, ${posts.length} posts)`);
