import { useMemo, useState, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Pill, ArrowRight, ArrowLeft, Sparkles } from 'lucide-react';
import { productsData, getCloudinaryUrl } from '../../data/products';
import RevealOnScroll from '../motion/RevealOnScroll';

type Product = typeof productsData[number];

export default function FeaturedProducts() {
  const navigate = useNavigate();
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const featured = useMemo(() => {
    const ids = ['melocox2-100', 'levobacter-750-20', 'ibone-oferta', 'taladro-50', 'clp-30', 'hematocri-suspension'];
    return ids.map(id => productsData.find(p => p.id === id)).filter(Boolean) as Product[];
  }, []);

  const total = featured.length;

  const goTo = useCallback((idx: number) => {
    setDirection(idx > activeIndex ? 1 : -1);
    setActiveIndex(((idx % total) + total) % total);
  }, [activeIndex, total]);

  const next = useCallback(() => {
    setDirection(1);
    setActiveIndex(prev => (prev + 1) % total);
  }, [total]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActiveIndex(prev => (prev - 1 + total) % total);
  }, [total]);

  useEffect(() => {
    if (isPaused || reduceMotion) return;
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next, isPaused, reduceMotion]);

  const active = featured[activeIndex];
  const nextProduct = featured[(activeIndex + 1) % total];
  const prevProduct = featured[(activeIndex - 1 + total) % total];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? '100%' : '-100%',
      opacity: 0,
      scale: 0.92,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? '-100%' : '100%',
      opacity: 0,
      scale: 0.92,
    }),
  };

  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-white via-emerald-50/20 to-white overflow-hidden relative">
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-primary/5 rounded-full blur-[60px] md:blur-[120px] pointer-events-none hidden md:block"></div>
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-emerald-300/15 rounded-full blur-[60px] md:blur-[120px] pointer-events-none hidden md:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll className="flex flex-col md:flex-row md:justify-between md:items-end mb-12 md:mb-16 gap-6">
          <div>
            <span className="inline-flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-[0.3em] mb-4">
              <Sparkles size={14} /> Catálogo selecto
            </span>
            <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight leading-[1.05]">
              Productos <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">destacados</span>
            </h2>
          </div>
          <button
            onClick={() => navigate('/productos')}
            className="self-start md:self-end inline-flex items-center px-6 py-3 bg-white border border-gray-200 text-gray-900 font-bold rounded-full hover:border-primary hover:text-primary hover:shadow-md transition-all group"
          >
            Ver todo el catálogo
            <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={20} />
          </button>
        </RevealOnScroll>

        <div
          className="relative"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="relative h-[640px] sm:h-[560px] md:h-[520px] lg:h-[540px] rounded-[2rem] md:rounded-[3rem] overflow-hidden bg-gradient-to-br from-gray-50 via-white to-emerald-50/40 border border-gray-100 shadow-[0_30px_80px_-30px_rgba(0,0,0,0.15)]">

            <div className="absolute top-6 left-6 md:top-8 md:left-8 z-30 flex items-center gap-3">
              <div className="bg-primary text-white px-4 py-1.5 rounded-full font-black text-xs tracking-widest uppercase shadow-lg shadow-primary/30">
                {String(activeIndex + 1).padStart(2, '0')} <span className="opacity-60">/ {String(total).padStart(2, '0')}</span>
              </div>
              <div className="hidden md:flex items-center gap-2 bg-white/80 md:backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest text-gray-500 border border-gray-100">
                <span className={`w-1.5 h-1.5 rounded-full ${isPaused || reduceMotion ? 'bg-gray-300' : 'bg-primary animate-pulse'}`}></span>
                {isPaused || reduceMotion ? 'Pausa' : 'Auto'}
              </div>
            </div>

            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 220, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
                }}
                drag={reduceMotion ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.2}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -80) next();
                  else if (info.offset.x > 80) prev();
                }}
                className="absolute inset-0 grid grid-cols-1 md:grid-cols-2 gap-0 cursor-grab active:cursor-grabbing"
              >
                <div className="relative flex items-center justify-center p-8 md:p-12 lg:p-16 bg-white/40 overflow-hidden">
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
                    className="absolute inset-6 md:inset-10 rounded-[2rem] bg-gradient-to-br from-emerald-50 via-white to-primary/5 border border-gray-100/80"
                  />

                  <div className="absolute top-12 right-12 text-primary/20 hidden md:block pointer-events-none">
                    <Pill size={60} />
                  </div>
                  <div className="absolute bottom-12 left-12 text-emerald-300/40 hidden md:block pointer-events-none">
                    <Pill size={48} />
                  </div>

                  <motion.img
                    src={getCloudinaryUrl(active.id)}
                    alt={active.name}
                    initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
                    animate={{ scale: 1, opacity: 1, rotate: 0 }}
                    transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                    className="relative z-10 max-w-full max-h-full object-contain mix-blend-multiply pointer-events-none select-none drop-shadow-2xl"
                    draggable={false}
                    onError={(e) => { e.currentTarget.style.opacity = '0'; }}
                  />
                </div>

                <div className="relative flex flex-col justify-center p-8 md:p-12 lg:p-16">
                  <motion.span
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.25 }}
                    className="inline-flex items-center gap-2 text-primary font-black text-xs uppercase tracking-[0.25em] mb-4"
                  >
                    <span className="w-8 h-px bg-primary"></span> Producto destacado
                  </motion.span>

                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    className="text-3xl md:text-4xl lg:text-5xl font-black text-gray-900 mb-5 leading-[1.05] tracking-tight"
                  >
                    {active.name}
                  </motion.h3>

                  <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                    className="text-gray-600 text-base md:text-lg leading-relaxed mb-8 line-clamp-4"
                  >
                    {active.description}
                  </motion.p>

                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    className="flex items-center gap-4"
                  >
                    <Link
                      to={`/productos/${active.id}`}
                      className="inline-flex items-center px-6 py-3.5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-glow-primary group"
                    >
                      Ver ficha técnica
                      <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prev}
              aria-label="Producto anterior"
              className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white md:bg-white/90 md:backdrop-blur border border-gray-200 shadow-xl text-gray-700 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all flex items-center justify-center"
            >
              <ArrowLeft size={20} />
            </button>
            <button
              onClick={next}
              aria-label="Producto siguiente"
              className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 z-30 w-11 h-11 md:w-12 md:h-12 rounded-full bg-white md:bg-white/90 md:backdrop-blur border border-gray-200 shadow-xl text-gray-700 hover:bg-primary hover:text-white hover:border-primary hover:scale-110 transition-all flex items-center justify-center"
            >
              <ArrowRight size={20} />
            </button>

            {!reduceMotion && (
              <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-100 z-20 overflow-hidden">
                <motion.div
                  key={activeIndex + (isPaused ? '-paused' : '')}
                  initial={{ width: '0%' }}
                  animate={{ width: isPaused ? '0%' : '100%' }}
                  transition={{ duration: isPaused ? 0 : 5, ease: 'linear' }}
                  className="h-full bg-gradient-to-r from-primary to-emerald-400 origin-left"
                />
              </div>
            )}
          </div>

          <div className="mt-8 md:mt-10 flex items-center justify-between gap-4">
            <button
              onClick={prev}
              className="hidden md:flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group min-w-0 max-w-[28%]"
            >
              <ArrowLeft size={18} className="shrink-0 group-hover:-translate-x-1 transition-transform" />
              <div className="text-left min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5">Anterior</p>
                <p className="text-sm font-bold text-gray-700 group-hover:text-primary truncate">{prevProduct.name}</p>
              </div>
            </button>

            <div className="flex items-center gap-2 mx-auto">
              {featured.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => goTo(idx)}
                  aria-label={`Ir al producto ${idx + 1}`}
                  className={`h-2 rounded-full transition-all duration-500 ${
                    idx === activeIndex
                      ? 'w-10 bg-primary'
                      : 'w-2 bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="hidden md:flex items-center gap-3 text-gray-400 hover:text-primary transition-colors group min-w-0 max-w-[28%]"
            >
              <div className="text-right min-w-0">
                <p className="text-[10px] font-bold uppercase tracking-widest mb-0.5">Siguiente</p>
                <p className="text-sm font-bold text-gray-700 group-hover:text-primary truncate">{nextProduct.name}</p>
              </div>
              <ArrowRight size={18} className="shrink-0 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
