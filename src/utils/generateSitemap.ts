// Genera el contenido del sitemap.xml a partir de los productos definidos en src/data/products.ts.
// Nota: actualmente no está enganchado al build; el archivo sitemap.xml en public/ se mantiene manualmente.
// Si en el futuro se quiere automatizar, llamar a generateSitemapXML() desde un script (similar a scripts/prerender.ts).

import { productsData } from '../data/products';

export function generateSitemapXML(): string {
  const baseUrl = 'https://jbarreiro.com.do';
  const today = new Date().toISOString().split('T')[0];

  const productUrls = productsData
    .map(product => `
  <url>
    <loc>${baseUrl}/productos/${product.id}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`)
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}/</loc>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/productos</loc>
    <changefreq>weekly</changefreq>
    <priority>0.9</priority>
  </url>${productUrls}
  <url>
    <loc>${baseUrl}/contacto</loc>
    <changefreq>monthly</changefreq>
    <priority>0.5</priority>
  </url>
</urlset>`;
}
