import { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Search, X, Sparkles } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { productsData } from '../data/products';
import ProductCard from '../components/products/ProductCard';

const QUICK_FILTERS = ['TALDRO', 'Antibiótico', 'Dolor', 'Hierro'];

export default function ProductsView() {
  const [searchTerm, setSearchTerm] = useState('');

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
  const newList = sortedProducts.filter(p => p.tag === 'estrella');
  const restList = sortedProducts.filter(p => p.tag !== 'estrella');

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
      </div>

      <div className="relative pt-12 pb-12 md:pt-20 lg:pt-28 lg:pb-20 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

          <div className="grid grid-cols-12 gap-y-12 lg:gap-x-10 items-end">

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
              className="col-span-12 lg:col-span-7"
            >
              <div className="flex items-center gap-4 mb-6 md:mb-8 text-[11px] font-mono uppercase tracking-[0.3em] text-gray-400">
                <span className="text-gray-700 font-semibold">JB · Catálogo</span>
                <span className="h-px w-12 bg-gray-300"></span>
                <span>{productsData.length} referencias</span>
              </div>

              <h1 className="font-black text-gray-900 tracking-tight leading-[0.9]">
                <span className="block text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.5rem]">Nuestros</span>
                <span className="block text-[3.25rem] sm:text-6xl md:text-7xl lg:text-[6.5rem] italic font-light text-primary -mt-1 md:-mt-2">
                  productos<span className="text-gray-900">.</span>
                </span>
              </h1>

              <p className="text-gray-500 max-w-md mt-6 md:mt-8 text-base md:text-lg leading-relaxed">
                Línea farmacéutica con foco en accesibilidad y calidad. Buscá por molécula, marca o presentación.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.15 }}
              className="col-span-12 lg:col-span-5 lg:pl-10 lg:border-l lg:border-gray-200"
            >
              <label htmlFor="catalog-search" className="block text-[10px] font-mono font-bold uppercase tracking-[0.35em] text-gray-400 mb-4">
                <span className="text-gray-600">→</span> Buscar en el catálogo
              </label>

              <div className="relative group">
                <Search
                  className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-primary transition-colors"
                  strokeWidth={2.5}
                />
                <input
                  id="catalog-search"
                  type="text"
                  className="w-full pl-9 pr-10 py-4 bg-transparent border-0 border-b-2 border-gray-200 focus:border-primary text-lg md:text-xl text-gray-900 font-semibold placeholder:text-gray-300 placeholder:font-normal focus:outline-none transition-colors duration-300"
                  placeholder="Pregabalina, Tadalafilo, Celecoxib..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <AnimatePresence>
                  {searchTerm.length > 0 && (
                    <motion.button
                      initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.5 }}
                      onClick={() => setSearchTerm('')}
                      aria-label="Limpiar búsqueda"
                      className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-gray-400 hover:text-gray-900 transition-colors focus:outline-none"
                    >
                      <X size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>

              <div className="flex flex-wrap items-center gap-2 mt-5">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-gray-400 mr-1">Sugerencias</span>
                {QUICK_FILTERS.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSearchTerm(s)}
                    className={`px-3 py-1.5 text-xs font-medium rounded-full transition-colors ${
                      searchTerm.toLowerCase() === s.toLowerCase()
                        ? 'bg-primary text-white border border-primary'
                        : 'bg-white text-gray-600 border border-gray-200 hover:border-gray-400 hover:text-gray-900'
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </motion.div>

          </div>
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
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {sortedProducts.map((product, index) => (
              <ProductCard
                key={product.id}
                product={product}
                index={index}
                variant={product.featured ? 'featured' : 'default'}
              />
            ))}
          </div>
        ) : (
          <>
            {newList.length > 0 && (
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
                      <Sparkles size={12} className="fill-current" /> Novedades
                    </span>
                    <h2 className="text-3xl md:text-4xl font-black text-gray-900 tracking-tight leading-tight">
                      Lo nuevo en catálogo
                    </h2>
                    <p className="text-gray-500 mt-2 text-sm md:text-base">
                      Las últimas incorporaciones a nuestra línea farmacéutica.
                    </p>
                  </div>
                  <span className="text-sm font-bold text-gray-400 uppercase tracking-widest">
                    {newList.length} {newList.length === 1 ? 'producto' : 'productos'}
                  </span>
                </motion.div>

                <div className="relative">
                  <div className="absolute -inset-x-4 -inset-y-6 md:-inset-x-8 md:-inset-y-10 -z-10 rounded-[3rem] bg-gradient-to-br from-amber-50/40 via-white to-emerald-50/30 border border-amber-100/50 hidden md:block"></div>
                  <div className="grid grid-cols-1 gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {newList.map((product, index) => (
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
                  {restList.map((product, index) => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      index={index}
                      variant={product.featured ? 'featured' : 'default'}
                    />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </motion.div>
  );
}
