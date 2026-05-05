import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Search, X, Star, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { productsData } from '../data/products';
import ProductCard from '../components/products/ProductCard';

export default function ProductsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(16);

  const filteredProducts = useMemo(() => {
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      const aStar = a.tag === 'estrella' ? 0 : 1;
      const bStar = b.tag === 'estrella' ? 0 : 1;
      if (aStar !== bStar) return aStar - bStar;
      const aFeat = a.featured ? 0 : 1;
      const bFeat = b.featured ? 0 : 1;
      return aFeat - bFeat;
    });
  }, [filteredProducts]);

  const isSearching = searchTerm.length > 0;
  const featuredList = sortedProducts.filter(p => p.featured);
  const restList = sortedProducts.filter(p => !p.featured);
  const visibleRest = restList.slice(0, Math.max(0, displayCount - featuredList.length));
  const totalVisible = featuredList.length + visibleRest.length;

  const visibleSearchProducts = sortedProducts.slice(0, displayCount);

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
      className="w-full bg-[#f8fafc] min-h-screen pb-24 relative overflow-hidden"
    >
      <Helmet>
        <title>Catálogo de Productos | JBARREIRO & CO</title>
        <meta name="description" content="Explora nuestro catálogo completo de medicamentos de alta calidad. Disponibilidad, garantía y logística a nivel nacional en República Dominicana." />
      </Helmet>

      <div className="absolute top-0 left-0 w-full h-[60vh] z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[60px] md:blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] bg-emerald-400/5 rounded-full blur-[60px] md:blur-[80px]"></div>

        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] md:top-[25%] left-[5%] md:left-[20%] text-primary/20 hidden md:block">
          <svg width="30" height="30" className="md:w-[40px] md:h-[40px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.div>

        <motion.div animate={{ y: [0, 30, 0], x: [0, 15, 0], rotate: [0, 45, 0] }} transition={{ duration: 18, repeat: Infinity }} className="absolute top-[5%] md:top-[35%] right-[10%] md:left-[10%] text-primary/10 hidden md:block">
          <Pill size={60} className="md:w-[100px] md:h-[100px]" />
        </motion.div>
      </div>

      <div className="relative pt-10 pb-12 md:pt-16 lg:pt-24 lg:pb-16 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="text-center max-w-3xl mx-auto mb-10 lg:mb-14">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 text-xs font-bold text-gray-500 uppercase tracking-[0.2em] mb-4 md:mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse"></span>
              Catálogo Completo
            </motion.div>
            <h1 className="text-5xl md:text-6xl lg:text-[5rem] font-black text-gray-900 tracking-tighter leading-[1.1]">
              Nuestros <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 pr-2">Productos</span>
            </h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
            className="max-w-3xl mx-auto w-full relative z-20"
          >
            <div className="flex items-center bg-white p-3 rounded-full shadow-[0_15px_40px_-15px_rgba(0,0,0,0.1)] border border-gray-100 focus-within:shadow-[0_20px_50px_-15px_rgba(27,166,75,0.2)] focus-within:border-primary/30 transition-all duration-500 transform hover:-translate-y-1">
              <div className="pl-4 md:pl-6 pr-2 md:pr-4 flex items-center justify-center">
                <Search className="h-5 w-5 md:h-6 md:w-6 text-primary/60" />
              </div>
              <input
                type="text"
                className="block w-full py-2 md:py-4 bg-transparent border-0 focus:ring-0 text-lg md:text-xl text-gray-900 font-bold placeholder-gray-300 focus:outline-none"
                placeholder="Buscar molécula, marca..."
                value={searchTerm}
                onChange={(e) => {
                  setSearchTerm(e.target.value);
                  setDisplayCount(16);
                }}
              />
              <AnimatePresence>
                {searchTerm.length > 0 && (
                  <motion.button
                    initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                    onClick={() => setSearchTerm('')}
                    className="p-2 md:p-3 mr-2 text-gray-400 hover:text-white bg-gray-100 hover:bg-primary rounded-full transition-colors focus:outline-none"
                  >
                    <X size={18} />
                  </motion.button>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20 pt-2 md:pt-4">

        <AnimatePresence>
          {isSearching && (
            <motion.div
              initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
              className="mb-10 text-center"
            >
              <div className="inline-block bg-white px-6 py-2 rounded-full border border-gray-100 shadow-sm">
                <p className="text-gray-500 text-sm font-medium">
                  Encontramos <span className="font-black text-gray-900">{filteredProducts.length}</span> resultados para <span className="text-primary font-black">"{searchTerm}"</span>
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[3rem] shadow-sm border border-gray-100">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="h-10 w-10 text-gray-300" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Sin resultados</h3>
            <p className="text-gray-500 mb-8">No hemos encontrado ningún medicamento con ese nombre.</p>
            <button onClick={() => setSearchTerm('')} className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-md hover:-translate-y-1">
              Ver todo el catálogo
            </button>
          </div>
        ) : isSearching ? (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleSearchProducts.map((product, index) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  index={index}
                  variant={product.featured ? 'featured' : 'default'}
                />
              ))}
            </div>
            {displayCount < sortedProducts.length && (
              <LoadMoreButton onClick={() => setDisplayCount(prev => prev + 16)} />
            )}
          </>
        ) : (
          <>
            {featuredList.length > 0 && (
              <section className="mb-16 md:mb-20">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col md:flex-row md:items-end md:justify-between gap-3 mb-8 md:mb-10"
                >
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gradient-to-r from-amber-50 to-amber-100/60 border border-amber-200 text-amber-700 font-bold text-[10px] uppercase tracking-[0.25em] mb-3">
                      <Star size={12} className="fill-current" /> Destacados
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                      Los más solicitados
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                      Familia <span className="font-black text-amber-600">TALDRO</span> y selección de bestsellers de nuestro catálogo.
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {featuredList.length} productos
                  </span>
                </motion.div>

                <div className="relative">
                  <div className="absolute -inset-x-4 -inset-y-6 md:-inset-x-8 md:-inset-y-10 -z-10 rounded-[3rem] bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 border border-amber-100/50 hidden md:block"></div>
                  <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {featuredList.map((product, index) => (
                      <ProductCard key={product.id} product={product} index={index} variant="featured" />
                    ))}
                  </div>
                </div>
              </section>
            )}

            {restList.length > 0 && (
              <section>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                  className="flex items-end justify-between gap-3 mb-8 md:mb-10"
                >
                  <div>
                    <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-gray-50 border border-gray-200 text-gray-500 font-bold text-[10px] uppercase tracking-[0.25em] mb-3">
                      <Sparkles size={12} /> Catálogo
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                      Resto del catálogo
                    </h2>
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest hidden sm:inline">
                    {restList.length} productos
                  </span>
                </motion.div>

                <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {visibleRest.map((product, index) => (
                    <ProductCard key={product.id} product={product} index={index} />
                  ))}
                </div>

                {totalVisible < sortedProducts.length && (
                  <LoadMoreButton onClick={() => setDisplayCount(prev => prev + 16)} />
                )}
              </section>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}

function LoadMoreButton({ onClick }: { onClick: () => void }) {
  return (
    <div className="mt-16 md:mt-20 text-center">
      <button onClick={onClick} className="inline-flex items-center px-10 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:border-primary hover:text-primary shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(27,166,75,0.3)] transition-all duration-300 transform md:hover:-translate-y-1 text-base group">
        Mostrar más catálogo
        <svg className="ml-3 w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>
    </div>
  );
}
