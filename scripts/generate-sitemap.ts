import { writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { productsData } from '../src/data/products';

const __dirname = dirname(fileURLToPath(import.meta.url));
const outputPath = resolve(__dirname, '..', 'public', 'sitemap.xml');
const baseUrl = 'https://jbarreiro.com.do';
const today = new Date().toISOString().slice(0, 10);

interface SitemapEntry {
  loc: string;
  lastmod?: string;
  changefreq?: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority?: number;
}

const entries: SitemapEntry[] = [
  { loc: `${baseUrl}/`, lastmod: today, changefreq: 'weekly', priority: 1.0 },
  { loc: `${baseUrl}/productos`, lastmod: today, changefreq: 'weekly', priority: 0.9 },
  ...productsData.map<SitemapEntry>(p => ({
    loc: `${baseUrl}/productos/${p.id}`,
    lastmod: today,
    changefreq: 'monthly',
    priority: 0.8,
  })),
  { loc: `${baseUrl}/contacto`, lastmod: today, changefreq: 'monthly', priority: 0.5 },
];

const renderEntry = (e: SitemapEntry) => {
  const lines = [`    <loc>${e.loc}</loc>`];
  if (e.lastmod) lines.push(`    <lastmod>${e.lastmod}</lastmod>`);
  if (e.changefreq) lines.push(`    <changefreq>${e.changefreq}</changefreq>`);
  if (e.priority !== undefined) lines.push(`    <priority>${e.priority.toFixed(1)}</priority>`);
  return `  <url>\n${lines.join('\n')}\n  </url>`;
};

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries.map(renderEntry).join('\n')}
</urlset>
`;

writeFileSync(outputPath, xml, 'utf8');
console.log(`Sitemap generado: ${entries.length} URLs (${productsData.length} productos) -> ${outputPath}`);
