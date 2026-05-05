export type ProductTag = 'estrella' | 'oferta';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  featured?: boolean;
  tag?: ProductTag;
}

export const IMAGE_MAP: Record<string, string> = {
  'barre-itis-5': 'barre-itis-5',
  'barre-itis-20': 'BARRE ITIS X20',
  'barre-pm-100': 'BARRE PM X100',
  'blindada-1': 'BLINDADA',
  'clp-30': 'CLP',
  'dic-b-10': 'DIC-B X10',
  'dic-b-100': 'DIC-B X100',
  'dic-b-relax-20': 'DIC-B RELAX',
  'hematocri-suspension': 'HEMATOCRI SUSPENSION',
  'hematocri-100': 'HEMATOCRI',
  'hematocri-30': 'HEMATOCRI X30',
  'ibone-oferta': 'IBONE',
  'jb-prazol-50': 'JB PRAZOL X50',
  'levobacter-500-20': 'LEVOBACTER 500MG',
  'levobacter-750-20': 'LEVOBACTER 750MG',
  'lumdocer-30': 'LUMDOCER',
  'taladro-50': 'TALADRO',
  'taldro-5mg-30': 'TALDRO 5mg',
  'taldro-fast-x10-20ml': 'TALDRO_FAST_X10_xu13er',
  'taldro-fast-frasco-240ml': 'TALDRO_FAST_240_ML_ps8sms',
  'melocox2-100': 'MELOCOX2 X100',
  'xib-p-10': 'XIB P',
  'xib-p-50': 'XIB P',
  'xib-200mg-50': 'XIB 200mg',
  'xib-400mg-50': 'XIB 400mg x50',
};

export const getCloudinaryUrl = (productId: string) => {
  const cloudName = 'didhygevw';
  const fileName = IMAGE_MAP[productId] || productId;
  const isTaldroFast =
    productId === 'taldro-fast-x10-20ml' || productId === 'taldro-fast-frasco-240ml';
  const basePath = isTaldroFast ? '' : 'catalogo_productos/';
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_pad,w_600,h_600/${basePath}${encodeURIComponent(fileName)}`;
};

export const productsData: Product[] = [
  { id: 'barre-itis-5', name: 'BARRE-ITIS X5', description: 'Antibiótico de amplio espectro para el tratamiento de diversas infecciones bacterianas.', price: '$769.00' },
  { id: 'barre-itis-20', name: 'BARRE-ITIS X20', description: 'Antibiótico de amplio espectro para el tratamiento de diversas infecciones bacterianas.', price: '$3,076.00' },
  { id: 'barre-pm-100', name: 'BARRE PM X100', description: 'Tratamiento utilizado como inductor del sueño. ', price: '$2,000.00' },
  { id: 'blindada-1', name: 'BLINDADA X1', description: 'Anticonceptivo de emergencia de dosis única, eficaz para prevenir el embarazo tras una relación sin protección.', price: '$99.00' },
  { id: 'clp-30', name: 'CLP X30 OFERTA (2X1)', description: 'Antiagregante plaquetario indicado para la prevención de eventos aterotrombóticos.', price: '$1,990.00', featured: true, tag: 'oferta' },
  { id: 'dic-b-10', name: 'DIC-B X10', description: 'Combinación analgésica, antiinflamatoria y neurotrópica.', price: '$500.00' },
  { id: 'dic-b-100', name: 'DIC-B X100', description: 'Combinación analgésica, antiinflamatoria y neurotrópica.', price: '$4,000.00' },
  { id: 'dic-b-relax-20', name: 'DIC-B RELAX X20', description: 'Formulación diseñada para el alivio del dolor inflamatorio con componente neurítico.', price: '$1,000.00' },
  { id: 'hematocri-30', name: 'HEMATOCRI X30', description: 'Suplemento antianémico para el tratamiento y prevención de deficiencias de hierro.', price: '$990.00' },
  { id: 'hematocri-100', name: 'HEMATOCRI X100', description: 'Suplemento antianémico para el tratamiento y prevención de deficiencias de hierro.', price: '$2,990.00' },
  { id: 'hematocri-suspension', name: 'HEMATOCRI SUSPENSION', description: 'Suplemento antianémico en suspensión, ideal para pacientes con dificultad para deglutir comprimidos.', price: '$990.00', featured: true },
  { id: 'ibone-oferta', name: 'IBONE OFERTA (2X1)', description: 'Indicado para el tratamiento y prevención de la osteoporosis.', price: '$2,990.00', featured: true, tag: 'oferta' },
  { id: 'jb-prazol-50', name: 'JB PRAZOL X50', description: 'Indicado para el tratamiento del reflujo gastroesofágico y úlceras gástricas.', price: '$3,500.00' },
  { id: 'levobacter-500-20', name: 'LEVOBACTER 500 mg X20', description: 'Antibiótico de amplio espectro para infecciones bacterianas.', price: '$2,500.00' },
  { id: 'levobacter-750-20', name: 'LEVOBACTER 750 mg X20', description: 'Antibiótico de alta potencia para infecciones bacterianas severas.', price: '$3,000.00', featured: true },
  { id: 'lumdocer-30', name: 'LUMDOCER X30', description: 'Modulador del dolor neuropático y coadyuvante.', price: '$1,990.00' },
  { id: 'melocox2-100', name: 'MELOCOX2 X100', description: 'Potente antiinflamatorio y analgésico.', price: '$5,000.00', featured: true },
  { id: 'taladro-50', name: 'TALADRO 20 mg X50', description: 'Indicado para la disfunción eréctil siendo utilizado como Estimulante Sexual.', price: '$2,000.00', featured: true, tag: 'estrella' },
  { id: 'taldro-5mg-30', name: 'TALDRO 5 mg X30', description: 'Ayuda al vaciado de la próstata, la miccion urinaria y favorece la erección.', price: '$1,990.00', featured: true, tag: 'estrella' },
  { id: 'taldro-fast-x10-20ml', name: 'TALDRO FAST SUSP. ORAL 20 ml/mg X10', description: 'Taladafilo 20 mg (cajita x10). Cada frasco de 20 ml = 20 mg de Taladafilo.', price: '$2,000.00', featured: true, tag: 'estrella' },
  { id: 'taldro-fast-frasco-240ml', name: 'TALDRO FAST SUSP. ORAL 240 ml', description: 'Taladafilo 5 mg. Cada 5 ml = 5 mg de Taladafilo. Frasco de 240 ml = 48 dosis.', price: '$1,990.00', featured: true, tag: 'estrella' },
  { id: 'xib-p-10', name: 'XIB-P X10', description: 'Combinación sinérgica para el manejo del dolor, inflamación y neuropatologías.', price: '$1,100.00' },
  { id: 'xib-200mg-50', name: 'XIB 200mg X10', description: 'Indicado para el alivio del dolor y la inflamación.', price: '$3,000.00' },
  { id: 'xib-400mg-50', name: 'XIB 400mg X50', description: 'Indicado para el alivio del dolor y la inflamación.', price: '$3,500.00' },
];
