import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { productsData, getCloudinaryUrl } from '../src/data/products';

const __dirname = dirname(fileURLToPath(import.meta.url));
const distDir = resolve(__dirname, '..', 'dist');
const baseUrl = 'https://jbarreiro.com.do';
const siteName = 'JBARREIRO & CO';

const indexHtml = readFileSync(resolve(distDir, 'index.html'), 'utf8');

interface RouteMeta {
  path: string;
  title: string;
  description: string;
  ogImage?: string;
  jsonLd?: Record<string, unknown>;
}

const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const cloudinaryFor = (id: string) => getCloudinaryUrl(id);

const routes: RouteMeta[] = [
  {
    path: '/',
    title: `${siteName} | Distribuidora Farmacéutica en República Dominicana`,
    description:
      'Distribuidora farmacéutica líder en República Dominicana. Abastecemos farmacias con medicamentos de alta calidad: analgésicos, antibióticos, suplementos y más.',
  },
  {
    path: '/productos',
    title: `Catálogo de Productos | ${siteName}`,
    description:
      'Catálogo completo de medicamentos JBARREIRO & CO: antibióticos, analgésicos, suplementos y más. Venta exclusiva a establecimientos farmacéuticos.',
  },
  {
    path: '/contacto',
    title: `Contacto | ${siteName}`,
    description:
      'Contacta a JBARREIRO & CO para cotización y distribución mayorista de medicamentos en República Dominicana.',
  },
  ...productsData.map<RouteMeta>(p => ({
    path: `/productos/${p.id}`,
    title: `${p.name} | Medicamentos JBARREIRO`,
    description: `${p.name} - ${p.description.trim()} Distribuidora farmacéutica en República Dominicana.`,
    ogImage: cloudinaryFor(p.id),
    jsonLd: {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: p.name,
      description: p.description.trim(),
      image: cloudinaryFor(p.id),
      brand: { '@type': 'Brand', name: siteName },
      manufacturer: { '@type': 'Organization', name: siteName, url: baseUrl },
      url: `${baseUrl}/productos/${p.id}`,
      offers: {
        '@type': 'Offer',
        price: p.price.replace(/[\$,]/g, ''),
        priceCurrency: 'DOP',
        availability: 'https://schema.org/InStock',
        url: `${baseUrl}/productos/${p.id}`,
      },
    },
  })),
];

const buildHead = (r: RouteMeta) => {
  const url = `${baseUrl}${r.path === '/' ? '' : r.path}`;
  const title = escapeHtml(r.title);
  const desc = escapeHtml(r.description);
  const og = r.ogImage ?? `${baseUrl}/MiniLogo.jpg`;
  const ldJson = r.jsonLd
    ? `\n    <script type="application/ld+json">${JSON.stringify(r.jsonLd)}</script>`
    : '';
  return `
    <title>${title}</title>
    <meta name="description" content="${desc}" />
    <link rel="canonical" href="${url}" />
    <meta property="og:title" content="${title}" />
    <meta property="og:description" content="${desc}" />
    <meta property="og:url" content="${url}" />
    <meta property="og:image" content="${og}" />
    <meta property="og:type" content="${r.jsonLd ? 'product' : 'website'}" />${ldJson}`;
};

const titleRegex = /<title>[\s\S]*?<\/title>/;
const descRegex = /<meta\s+name="description"[^>]*>/;
const canonicalRegex = /<link\s+rel="canonical"[^>]*>/;
const ogTitleRegex = /<meta\s+property="og:title"[^>]*>/;
const ogDescRegex = /<meta\s+property="og:description"[^>]*>/;
const ogUrlRegex = /<meta\s+property="og:url"[^>]*>/;
const ogImageRegex = /<meta\s+property="og:image"[^>]*>/;
const ogTypeRegex = /<meta\s+property="og:type"[^>]*>/;

const renderRoute = (r: RouteMeta) => {
  let html = indexHtml;
  // Strip the existing default head tags we are replacing.
  html = html
    .replace(titleRegex, '')
    .replace(descRegex, '')
    .replace(canonicalRegex, '')
    .replace(ogTitleRegex, '')
    .replace(ogDescRegex, '')
    .replace(ogUrlRegex, '')
    .replace(ogImageRegex, '')
    .replace(ogTypeRegex, '');
  return html.replace('</head>', `${buildHead(r)}\n  </head>`);
};

const writeRoute = (r: RouteMeta) => {
  const outPath =
    r.path === '/'
      ? resolve(distDir, 'index.html')
      : resolve(distDir, r.path.replace(/^\//, ''), 'index.html');
  mkdirSync(dirname(outPath), { recursive: true });
  writeFileSync(outPath, renderRoute(r), 'utf8');
};

for (const r of routes) writeRoute(r);

console.log(`[prerender] Wrote ${routes.length} HTML files into dist/.`);
