import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import App from './App';
import { getAllPosts } from './lib/posts';

export const staticRoutes = ['/', '/about', '/blog', '/work-with-me', '/privacy', '/terms'];

export function getRoutes(): string[] {
  return [...staticRoutes, ...getAllPosts().map((p) => `/blog/${p.slug}`)];
}

export function render(url: string): string {
  return renderToString(
    <StrictMode>
      <HelmetProvider>
        <StaticRouter location={url}>
          <App />
        </StaticRouter>
      </HelmetProvider>
    </StrictMode>,
  );
}
