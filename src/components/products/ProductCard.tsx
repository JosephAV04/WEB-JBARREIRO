import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Pill, ArrowRight, Star, Sparkles } from 'lucide-react';
import type { Product } from '../../data/products';
import { getCloudinaryUrl } from '../../data/products';

function getProductPresentation(name: string) {
  const match = name.match(/^(.*?)\s+(X\d+.*|OFERTA.*|\(?\d+X\d+\)?.*)$/i);
  if (match) {
    return { baseName: match[1].trim(), presentation: match[2].trim().toUpperCase() };
  }
  return { baseName: name, presentation: null };
}

function formatActiveIngredient(text: string) {
  return text.replace(/MG/gi, 'mg').trim();
}

export default function ProductCard({
  product,
  index,
  variant = 'default',
}: {
  product: Product;
  index: number;
  variant?: 'default' | 'featured';
}) {
  const isTaldroFast = product.id.startsWith('taldro-fast');
  const activeIngredient = formatActiveIngredient(product.description.split('.')[0]);
  const cardDescription = isTaldroFast
    ? product.description.split('.').slice(1).join('.').trim()
    : product.description;
  const { baseName, presentation } = getProductPresentation(product.name);

  const isStar = product.tag === 'estrella';
  const isOferta = product.tag === 'oferta';
  const isFeatured = variant === 'featured';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.04, 0.4), duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
    >
      <Link to={`/productos/${product.id}`} className="block h-full outline-none group">
        <div
          className={`relative h-full bg-white rounded-[2rem] p-4 border transition-all duration-300 flex flex-col overflow-hidden
            ${isStar
              ? 'border-amber-300/60 shadow-[0_8px_30px_-10px_rgba(245,158,11,0.25)] hover:shadow-[0_20px_50px_-15px_rgba(245,158,11,0.4)] hover:border-amber-400'
              : isFeatured
              ? 'border-primary/30 shadow-[0_8px_30px_-10px_rgba(32,167,64,0.18)] hover:shadow-[0_20px_50px_-15px_rgba(32,167,64,0.35)] hover:border-primary'
              : 'border-gray-100 shadow-sm hover:shadow-xl hover:border-primary/20'}
            transform md:hover:-translate-y-1`}
        >
          {isStar && (
            <span className="pointer-events-none absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-300"></span>
          )}
          {isFeatured && !isStar && (
            <span className="pointer-events-none absolute -top-px -left-px -right-px h-1 bg-gradient-to-r from-primary via-emerald-400 to-primary"></span>
          )}

          {(isStar || isOferta) && (
            <div className="absolute top-3 left-3 z-30 flex flex-col gap-2">
              {isStar && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-amber-400 to-amber-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-amber-500/40">
                  <Star size={11} className="fill-current" />
                  Más vendido
                </span>
              )}
              {isOferta && (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-gradient-to-r from-rose-500 to-red-500 text-white text-[10px] font-black uppercase tracking-widest shadow-lg shadow-red-500/40">
                  <Sparkles size={11} />
                  Oferta 2×1
                </span>
              )}
            </div>
          )}

          <div className="w-full h-48 md:h-52 bg-gray-50/70 rounded-2xl flex items-center justify-center relative overflow-hidden mb-5 border border-gray-100/50">
            {presentation && (
              <div className="absolute bottom-3 right-3 z-30 bg-white px-3 py-1 rounded-xl border-2 border-primary shadow-sm transform group-hover:scale-105 transition-transform duration-300">
                <span className="text-primary font-black text-xs md:text-sm uppercase tracking-widest">{presentation}</span>
              </div>
            )}

            <img
              src={getCloudinaryUrl(product.id)}
              alt={baseName}
              loading="lazy"
              className="w-full h-full object-contain p-4 transition-all duration-700 md:group-hover:scale-105 relative z-10 mix-blend-multiply"
              onError={(e) => { e.currentTarget.style.opacity = '0'; }}
            />
            <Pill size={80} className="text-gray-100 absolute z-0 opacity-30" />
          </div>

          <div className="px-1 flex-grow flex flex-col relative">
            {isTaldroFast && (
              <p className="text-[11px] font-bold text-primary/80 uppercase tracking-widest mb-1.5 line-clamp-1">
                {activeIngredient}
              </p>
            )}

            <h3 className="text-2xl font-black leading-tight mb-3 text-gray-900 md:group-hover:text-primary transition-colors">
              {baseName}
            </h3>

            <p className="text-sm text-gray-500 flex-grow mb-6 line-clamp-2 leading-relaxed">
              {cardDescription || 'Medicamento de alta eficacia.'}
            </p>

            <div className="mt-auto">
              <div
                className={`w-full py-3.5 rounded-xl flex items-center justify-center transition-all duration-300 gap-2 font-bold text-sm
                  ${isStar
                    ? 'bg-amber-50 text-amber-600 md:group-hover:bg-gradient-to-r md:group-hover:from-amber-400 md:group-hover:to-amber-500 md:group-hover:text-white'
                    : 'bg-primary/10 text-primary md:group-hover:bg-primary md:group-hover:text-white'}`}
              >
                Ver Ficha Técnica <ArrowRight size={18} className="transform md:group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
