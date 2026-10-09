import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { render } from '../dist-ssr/entry-server.js';
import { PUBLIC_ROUTES, SITE_URL, renderSeoHead } from '../src/seo.js';

const template = await readFile('dist/index.html', 'utf8');
for (const route of PUBLIC_ROUTES) {
  const html = template
    .replace(/<!-- SEO_START -->[\s\S]*?<!-- SEO_END -->/, `<!-- SEO_START -->${renderSeoHead(route)}<!-- SEO_END -->`)
    .replace('<div id="root"></div>', () => `<div id="root" data-route="${route}">${render(route)}</div>`)
    .replace('<body>', route === '/u-impact/' ? '<body class="u-impact-active">' : '<body>');
  const directory = `dist${route}`;
  await mkdir(directory, { recursive: true });
  await writeFile(directory + 'index.html', html);
  console.log(`Pre-rendered ${route}`);
}
await writeFile('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${PUBLIC_ROUTES.map(route => `  <url><loc>${SITE_URL}${route}</loc></url>`).join('\n')}
</urlset>\n`);
