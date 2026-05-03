import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Search, X, ArrowRight } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { productsData, getCloudinaryUrl } from '../data/products';

export default function ProductsView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [displayCount, setDisplayCount] = useState(16);

  const filteredProducts = useMemo(() => {
    return productsData.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const visibleProducts = useMemo(() => {
    return filteredProducts.slice(0, displayCount);
  }, [filteredProducts, displayCount]);

  const getProductPresentation = (name: string) => {
    const match = name.match(/^(.*?)\s+(X\d+.*|OFERTA.*|\(?\d+X\d+\)?.*)$/i);
    if (match) {
      return {
        baseName: match[1].trim(),
        presentation: match[2].trim().toUpperCase(),
      };
    }
    return {
      baseName: name,
      presentation: null,
    };
  };

  const formatActiveIngredient = (text: string) => {
    return text.replace(/MG/gi, 'mg').trim();
  };

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
        <div className="absolute top-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-primary/5 rounded-full blur-[100px]"></div>
        <div className="absolute top-[20%] right-[-10%] w-[30vw] h-[30vw] bg-emerald-400/5 rounded-full blur-[80px]"></div>

        <motion.div animate={{ y: [0, -15, 0], rotate: [0, 90, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} className="absolute top-[10%] md:top-[25%] left-[5%] md:left-[20%] text-primary/20">
          <svg width="30" height="30" className="md:w-[40px] md:h-[40px]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14M5 12h14"/></svg>
        </motion.div>

        <motion.div animate={{ y: [0, 30, 0], x: [0, 15, 0], rotate: [0, 45, 0] }} transition={{ duration: 18, repeat: Infinity }} className="absolute top-[5%] md:top-[35%] right-[10%] md:left-[10%] text-primary/10">
          <Pill size={60} className="md:w-[100px] md:h-[100px]" />
        </motion.div>
      </div>

      <div className="relative pt-10 pb-16 md:pt-16 lg:pt-24 lg:pb-20 z-10">
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
          {searchTerm && (
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
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product, index) => {
                const isTaldroFast = product.id.startsWith('taldro-fast');
                const activeIngredientRaw = product.description.split('.')[0];
                const activeIngredient = formatActiveIngredient(activeIngredientRaw);
                const cardDescription = isTaldroFast
                  ? product.description.split('.').slice(1).join('.').trim()
                  : product.description;
                const { baseName, presentation } = getProductPresentation(product.name);

                return (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={product.id}
                  >
                    <Link to={`/productos/${product.id}`} className="block h-full outline-none">
                      <div className="bg-white rounded-[2rem] p-4 shadow-sm border border-gray-100 hover:shadow-xl hover:border-primary/20 transform md:hover:-translate-y-1 transition-all duration-300 flex flex-col h-full group">

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
                            {cardDescription || "Medicamento de alta eficacia."}
                          </p>

                          <div className="mt-auto">
                            <div className="w-full py-3.5 rounded-xl flex items-center justify-center transition-all duration-300 gap-2 font-bold text-sm bg-primary/10 text-primary md:group-hover:bg-primary md:group-hover:text-white">
                              Ver Ficha Técnica <ArrowRight size={18} className="transform md:group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>

                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>

            {displayCount < filteredProducts.length && (
              <div className="mt-20 text-center">
                <button onClick={() => setDisplayCount(prev => prev + 16)} className="inline-flex items-center px-10 py-4 bg-white text-gray-900 border border-gray-200 font-bold rounded-full hover:border-primary hover:text-primary shadow-sm hover:shadow-[0_10px_30px_-10px_rgba(27,166,75,0.3)] transition-all duration-300 transform md:hover:-translate-y-1 text-base group">
                  Mostrar más catálogo
                  <svg className="ml-3 w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                  </svg>
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
