// Este archivo genera el contenido del sitemap.xml para incluir todos los productos

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
}

// Debe coincidir con los productos en App.tsx
const productsData: Product[] = [
  { id: 'barre-itis-5', name: 'BARRE ITIS X5', description: 'Compuesto inyectable con propiedades antiinflamatorias.', price: '$500.00' },
  { id: 'barre-itis-20', name: 'BARRE ITIS X20', description: 'Compuesto inyectable con propiedades antiinflamatorias.', price: '$2,000.00' },
  { id: 'barre-pm-100', name: 'BARRE PM X100', description: 'Complejo de vitaminas y minerales para fortalecer sistema inmunológico.', price: '$3,500.00' },
  { id: 'blindada-1', name: 'BLINDADA', description: 'Suplemento multivitamínico de amplio espectro con ingredientes naturales.', price: '$2,500.00' },
  { id: 'clp-30', name: 'CLP X30', description: 'Producto con componentes naturales para cuidado de la salud.', price: '$1,200.00' },
  { id: 'dic-b-10', name: 'DIC-B X10', description: 'Complejo de vitaminas del grupo B con acción energizante.', price: '$800.00' },
  { id: 'dic-b-100', name: 'DIC-B X100', description: 'Complejo de vitaminas del grupo B con acción energizante.', price: '$7,000.00' },
  { id: 'dic-b-relax-20', name: 'DIC-B RELAX X20', description: 'Fórmula relajante con vitaminas del grupo B.', price: '$1,500.00' },
  { id: 'hematocri-suspension', name: 'HEMATOCRI Suspensión Oral', description: 'Suplemento de hierro en forma de suspensión para absorción óptima.', price: '$1,800.00' },
  { id: 'hematocri-100', name: 'HEMATOCRI X100', description: 'Suplemento de hierro en comprimidos.', price: '$4,000.00' },
  { id: 'hematocri-30', name: 'HEMATOCRI X30', description: 'Suplemento de hierro en comprimidos.', price: '$1,500.00' },
  { id: 'ibone-oferta', name: 'IBONE OFERTA', description: 'Suplemento de calcio para fortalecimiento óseo.', price: '$2,200.00' },
  { id: 'jb-prazol-50', name: 'JB PRAZOL X50', description: 'Protector gástrico indicado para acidez estomacal y úlceras.', price: '$2,500.00' },
  { id: 'levobacter-500-20', name: 'LEVOBACTER 500mg X20', description: 'Levofloxacino 500mg. Antibiótico de amplio espectro para infecciones bacterianas.', price: '$1,200.00' },
  { id: 'levobacter-750-20', name: 'LEVOBACTER 750mg X20', description: 'Levofloxacino 750mg. Antibiótico potente para infecciones severas.', price: '$1,500.00' },
  { id: 'lumdocer-30', name: 'LUMDOCER X30', description: 'Modulador del dolor neuropático y coadyuvante.', price: '$1,990.00' },
  { id: 'melocox2-100', name: 'MELOCOX2 X100', description: 'Potente antiinflamatorio y analgésico.', price: '$5,000.00' },
  { id: 'taladro-50', name: 'TALADRO 20 mg X50', description: 'Indicado para la disfunción eréctil siendo utilizado como Estimulante Sexual.', price: '$2,000.00' },
  { id: 'taldro-5mg-30', name: 'TALDRO 5 mg X30', description: 'Ayuda al vaciado de la próstata, la miccion urinaria y favorece la erección.', price: '$1,990.00' },
  { id: 'taldro-fast-x10-20ml', name: 'TALDRO FAST SUSP. ORAL 20 ml/mg X10', description: 'Taladafilo 20 mg (cajita x10). Cada frasco de 20 ml = 20 mg de Taladafilo.', price: '$2,000.00' },
  { id: 'taldro-fast-frasco-240ml', name: 'TALDRO FAST SUSP. ORAL 240 ml', description: 'Taladafilo 5 mg. Cada 5 ml = 5 mg de Taladafilo. Frasco de 240 ml = 48 dosis.', price: '$1,990.00' },
  { id: 'xib-p-10', name: 'XIB-P X10', description: 'Combinación sinérgica para el manejo del dolor, inflamación y neuropatologías.', price: '$1,100.00' },
  { id: 'xib-200mg-50', name: 'XIB 200mg X10', description: 'Indicado para el alivio del dolor y la inflamación.', price: '$3,000.00' },
  { id: 'xib-400mg-50', name: 'XIB 400mg X50', description: 'Indicado para el alivio del dolor y la inflamación.', price: '$3,500.00' },
];

export function generateSitemapXML(): string {
  const baseUrl = 'https://jbarreiro.com.do';
  
  const productUrls = productsData
    .map(product => `
  <url>
    <loc>${baseUrl}/productos/${product.id}</loc>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
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
