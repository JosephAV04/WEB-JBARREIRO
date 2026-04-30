import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Phone, Mail, MapPin, Search, X, ArrowRight, ShieldCheck, Truck, CheckCircle2, ArrowLeft, Building2, Instagram, Facebook, Twitter, Home, Clock } from 'lucide-react';
import logoEmpresa from './assets/JBarreiro.png';
import logoCarol from './assets/LogoCarol.png';
import logoGBC from './assets/LogoGBC.png';
import logoHidalgos from './assets/LogoHidalgos.png';
import logoValue from './assets/LogoValue.png';
import { Helmet, HelmetProvider } from 'react-helmet-async';
import { productsData, getCloudinaryUrl } from './data/products';


function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <HelmetProvider>
      <Router>
        <ScrollToTop />
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-20 md:pb-0">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomeView />} />
              <Route path="/productos" element={<ProductsView />} />
              <Route path="/productos/:id" element={<ProductDetailView />} />
              <Route path="/contacto" element={<ContactView />} />
            </Routes>
          </main>
          <Footer />
          
          {/* WhatsApp FAB - RESTAURADO */}
          <a 
            href="https://wa.me/18099092606" 
            target="_blank" 
            rel="noopener noreferrer"
            className="fixed bottom-24 right-6 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
            aria-label="Contactar por WhatsApp"            
          >

            <svg viewBox="0 0 24 24" width="28" height="28" fill="currentColor" className="text-white">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>

            <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-500 ease-in-out whitespace-nowrap font-medium">
              WhatsApp
            </span>
          </a>

          {/* Mobile Bottom Navigation */}
          <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
            <BottomNavLink to="/" icon={<Home size={24} />} label="Inicio" />
            <BottomNavLink to="/productos" icon={<Pill size={24} />} label="Productos" />
            <BottomNavLink to="/contacto" icon={<Mail size={24} />} label="Contacto" />
          </div>
        </div>
      </Router>
    </HelmetProvider> 
  );
}

function BottomNavLink({ to, icon, label }: { to: string; icon: React.ReactNode; label: string }) {
  const location = useLocation();
  const isActive = to === '/' ? location.pathname === '/' : location.pathname.startsWith(to);
  
  return (
    <Link to={to} className={`flex flex-col items-center space-y-1 transition-colors ${isActive ? 'text-primary' : 'text-gray-400'}`}>
      <div className={`p-1 rounded-xl transition-colors ${isActive ? 'bg-primary/10' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
    </Link>
  );
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  useEffect(() => {
    let rafId = 0;
    const update = () => {
      rafId = 0;
      const y = window.scrollY;
      setScrolled((prev: boolean) => {
        if (!prev && y > 40) return true;
        if (prev && y < 10) return false;
        return prev;
      });
    };
    const handleScroll = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(update);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (rafId) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <header className={`bg-primary sticky top-0 z-50 transition-shadow duration-300 border-b border-primary-dark/20 will-change-transform ${scrolled ? 'shadow-xl' : ''}`}>
      <div className="w-full pl-0 pr-4 sm:pr-6 lg:pr-12">
        <div className={`flex justify-between items-stretch transition-[height] duration-300 ease-out will-change-[height] ${scrolled ? 'h-16 md:h-20' : 'h-20 md:h-28'}`}>
          
          <Link to="/" className="relative flex items-center h-full cursor-pointer group">
            <motion.div 
              className="absolute -top-[2px] -bottom-[2px] -left-[20px] right-0 bg-white shadow-[10px_0_30px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-right-[16px]"
              style={{ clipPath: "polygon(0 0, 100% 0, calc(100% - 25px) 100%, 0% 100%)" }}
            />
            <div className="relative z-10 px-6 sm:px-10 md:px-14 h-full flex items-center justify-center">
              <img 
                src={logoEmpresa} 
                alt="J. Barreiro Logo" 
                className="h-[60%] sm:h-[70%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>
          
          {/* Navegación de Escritorio */}
          <nav className="hidden md:flex space-x-2 h-full items-center">
            <Link to="/" className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}>Inicio</Link>
            <Link to="/productos" className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/productos') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}>Productos</Link>
            <Link to="/contacto" className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/contacto') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}>Contacto</Link>
          </nav>

        </div>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-[#0B1C10] text-white relative overflow-hidden pt-24 pb-12 mt-auto">
      {/* Elementos decorativos del fondo */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent z-0"></div>
      <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none z-0"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5">
            <p className="text-gray-400 text-lg leading-relaxed max-w-md font-light">
              Distribuidora farmacéutica experta en medicamentos comprimidos. Elevando el estándar de salud en la República Dominicana.
            </p>
          </div>
          
          <div className="md:col-span-3">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-sm mb-8 flex items-center">
              <span className="w-8 h-px bg-primary mr-4"></span> Navegación
            </h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-gray-400 hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Inicio</Link></li>
              <li><Link to="/productos" className="text-gray-400 hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Productos</Link></li>
              <li><Link to="/contacto" className="text-gray-400 hover:text-primary transition-colors flex items-center group"><ArrowRight size={14} className="mr-2 opacity-0 -ml-4 group-hover:opacity-100 group-hover:ml-0 transition-all" /> Contacto</Link></li>
            </ul>
          </div>

          <div className="md:col-span-4">
            <h4 className="text-white font-bold uppercase tracking-[0.2em] text-sm mb-8 flex items-center">
              <span className="w-8 h-px bg-primary mr-4"></span> Contacto Directo
            </h4>
            <ul className="space-y-6">
              <li className="flex items-start">
                <div className="bg-white/5 p-3 rounded-xl mr-4 text-primary">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Línea Principal</p>
                  <p className="text-gray-300 font-medium">809 980 8810</p>
                </div>
              </li>
              <li className="flex items-start">
                <div className="bg-white/5 p-3 rounded-xl mr-4 text-primary">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wider font-bold mb-1">Correo Electrónico</p>
                  <p className="text-gray-300 font-medium">jbarreiro.co@gmail.com</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-6 relative z-10">
          <div className="flex space-x-4">
            <a href="https://www.instagram.com/jbarreiroco/" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <Instagram size={18} />
            </a>
            <a href="https://web.facebook.com/taladromax?locale=es_LA" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <Facebook size={18} />
            </a>
            <a href="https://x.com/JBarreiroCo" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-400 hover:bg-primary hover:text-white transition-all">
              <Twitter size={18} />
            </a>
          </div>
          
          <p className="text-gray-500 text-sm font-light">
            © {new Date().getFullYear()} J. Barreiro & CO. S.R.L. Todos los derechos reservados.
          </p>
          
          <div className="hidden md:block">
            <span className="text-primary/50 text-xs uppercase tracking-[0.3em] font-bold">Salud • Confianza • Calidad</span>
          </div>
        </div>
      </div>
      
      {/* Massive watermark text (Separado y corregido para evitar cortes) */}
      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none flex justify-center opacity-[0.03] z-0 pb-2">
        <span className="text-[12vw] font-black whitespace-nowrap text-white">
          J. BARREIRO
        </span>
      </div>
    </footer>
  );
}

function HomeView() {
  const navigate = useNavigate();
  const [activeFeaturedIndex, setActiveFeaturedIndex] = useState(0);
  
  const featuredProducts = useMemo(() => {
    const selectedIds = ['melocox2-100', 'levobacter-750-20', 'ibone-oferta', 'taladro-50', 'clp-30'];
    return selectedIds.map(id => productsData.find(p => p.id === id)).filter(Boolean) as typeof productsData;
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveFeaturedIndex((prev) => (prev + 1) % featuredProducts.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [featuredProducts.length]);

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-white"
    >
      <section className="relative min-h-[calc(100vh-7rem)] flex items-center overflow-hidden bg-gradient-to-b from-gray-50 to-white">
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ rotate: 360, scale: [1, 1.1, 1] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[30%] -right-[10%] w-[80vw] h-[80vw] rounded-full bg-gradient-to-br from-[#188031]/10 via-[#25D366]/5 to-transparent blur-[120px]"
          />
          <motion.div 
            animate={{ rotate: -360, scale: [1, 1.2, 1] }}
            transition={{ duration: 40, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-emerald-400/10 to-transparent blur-[100px]"
          />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-40"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-10 pb-16 lg:pt-4 lg:pb-20 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-16 items-center">
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-flex items-center px-4 py-2 rounded-full bg-primary/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-primary/20 shadow-sm"
              >
                <span className="flex h-2.5 w-2.5 rounded-full bg-primary mr-3 animate-pulse"></span>
                Distribuidora Farmacéutica
              </motion.div>

              <h1 className="text-5xl md:text-6xl xl:text-[5.5rem] font-extrabold text-gray-900 leading-[1.05] mb-6 tracking-tighter">
                Elevemos la <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Salud</span> en cada dosis.
              </h1>
              <p className="text-lg md:text-xl xl:text-2xl text-gray-600 leading-relaxed mb-8 max-w-lg font-medium">
                Abastecemos a las principales cadenas de farmacias con medicamentos de la más alta calidad y eficacia comprobada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/productos')}
                  className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-[0_0_40px_-10px_rgba(24,128,49,0.5)] hover:shadow-[0_0_60px_-15px_rgba(24,128,49,0.7)] flex items-center justify-center group text-lg transform hover:-translate-y-1"
                >
                  Explorar Catálogo
                  <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={24} />
                </button>
                <button 
                  onClick={() => navigate('/contacto')}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-100 font-bold rounded-full hover:border-primary/30 hover:bg-gray-50 transition-all flex items-center justify-center group text-lg"
                >
                  Contactar Ventas
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block h-[450px] xl:h-[550px]"
            >
              <motion.div
                animate={{ y: [-10, 10, -10] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-[75%] aspect-[4/5] bg-white/40 backdrop-blur-xl rounded-[3rem] p-4 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-white"
              >
                <div className="w-full h-full rounded-[2.5rem] bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                  <img 
                    src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop" 
                    alt="Laboratorio Farmacéutico" 
                    className="absolute inset-0 w-full h-full object-cover opacity-90 mix-blend-multiply group-hover:scale-110 transition-transform duration-1000" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B1C10]/90 via-primary/30 to-transparent"></div>
                  
                  <div className="absolute bottom-0 left-0 right-0 p-6 xl:p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="bg-white/10 backdrop-blur-md p-5 xl:p-6 rounded-2xl border border-white/20">
                      <p className="text-emerald-300 font-bold text-xs xl:text-sm uppercase mb-2 tracking-widest flex items-center">
                        <ShieldCheck size={16} className="mr-2" /> Compromiso J. Barreiro
                      </p>
                      <p className="text-white font-extrabold text-2xl xl:text-3xl leading-tight">Calidad Farmacéutica Superior</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, -15, 0], rotate: [0, 3, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute top-8 -right-2 z-30 bg-white p-4 xl:p-5 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
                  <ShieldCheck size={24} className="xl:w-7 xl:h-7" />
                </div>
                <div>
                  <p className="text-[10px] xl:text-xs font-bold text-gray-400 uppercase tracking-wider">Garantía</p>
                  <p className="text-base xl:text-lg font-bold text-gray-900">100% Certificado</p>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 15, 0], rotate: [0, -3, 0] }}
                transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
                className="absolute top-[30%] -left-8 xl:-left-12 z-30 bg-white p-4 xl:p-5 rounded-3xl shadow-2xl border border-gray-100 flex items-center gap-4"
              >
                <div className="w-12 h-12 xl:w-14 xl:h-14 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-500">
                  <Truck size={24} className="xl:w-7 xl:h-7" />
                </div>
                <div>
                  <p className="text-[10px] xl:text-xs font-bold text-gray-400 uppercase tracking-wider">Logística</p>
                  <p className="text-base xl:text-lg font-bold text-gray-900">Entregas 24/48h</p>
                </div>
              </motion.div>

              <motion.div
                 animate={{ y: [-20, 20, -20], rotate: [0, 45, 0] }}
                 transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
                 className="absolute top-[10%] -left-4 z-10 text-primary/20 blur-[2px]"
              >
                <Pill size={60} className="xl:w-20 xl:h-20" />
              </motion.div>

              <motion.div
                 animate={{ y: [20, -20, 20], rotate: [45, 0, 45] }}
                 transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                 className="absolute bottom-1/4 -right-8 z-10 text-emerald-400/20 blur-[1px]"
              >
                <Pill size={80} className="xl:w-[100px] xl:h-[100px]" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      <div className="bg-primary py-6 overflow-hidden flex whitespace-nowrap">
        <motion.div 
          className="flex shrink-0 items-center gap-8 px-4"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <MarqueeText />
        </motion.div>
        <motion.div 
          className="flex shrink-0 items-center gap-8 px-4"
          animate={{ x: ['0%', '-100%'] }}
          transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
        >
          <MarqueeText />
        </motion.div>
      </div>

      <section className="py-32 bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6"
          >
            <div>
              <h2 className="text-5xl font-extrabold text-gray-900 mb-6 tracking-tight">Productos Destacados</h2>
              <p className="text-2xl text-gray-500 max-w-2xl font-light">Nuestras soluciones más solicitadas por las principales cadenas de farmacias.</p>
            </div>
            <button 
              onClick={() => navigate('/productos')}
              className="text-primary font-bold flex items-center hover:underline text-xl"
            >
              Ver todo el catálogo <ArrowRight className="ml-2" size={24} />
            </button>
          </motion.div>

          <div className="relative min-h-[600px] md:min-h-[550px]">
            <AnimatePresence mode="wait">
              {featuredProducts.length > 0 && (
                <motion.div
                  key={activeFeaturedIndex}
                  initial={{ opacity: 0, x: 100 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -100 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="absolute inset-0 grid grid-cols-1 lg:grid-cols-5 gap-8"
                >
                  <div className="lg:col-span-3 bg-gray-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row group h-full">
                    
                    <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden aspect-square md:aspect-auto">
                      <div className="absolute inset-0 bg-primary/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                        <div className="w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-inner flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden p-4">
                          <img 
                            src={getCloudinaryUrl(featuredProducts[activeFeaturedIndex]?.id || '')} 
                            alt={featuredProducts[activeFeaturedIndex]?.name || 'Producto'}
                            className="max-w-full max-h-full object-contain relative z-10"
                            loading="eager"
                            onError={(e) => {
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                          <Pill size={80} className="text-gray-100 absolute z-0 opacity-40 md:w-[100px] md:h-[100px]" />
                        </div>
                      </div>
                    
                    <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-50">
                      <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block">Destacado</span>
                      <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight line-clamp-2 md:line-clamp-none">{featuredProducts[activeFeaturedIndex]?.name}</h3>
                      <p className="text-gray-500 text-base md:text-xl mb-6 md:mb-10 line-clamp-3 md:line-clamp-4 font-light">{featuredProducts[activeFeaturedIndex]?.description}</p>
                      
                      {/* UX MÓVIL: Botón grande para celulares */}
                      <div className="mt-auto flex items-center justify-end pt-4 border-t border-gray-200 md:border-none md:pt-0">
                        <Link 
                          to={`/productos/${featuredProducts[activeFeaturedIndex]?.id || ''}`}
                          className="w-full md:w-auto p-4 md:p-5 bg-primary/10 md:bg-white text-primary rounded-xl md:rounded-2xl hover:bg-primary hover:text-white transition-all md:shadow-md flex justify-center items-center font-bold"
                        >
                          <span className="md:hidden mr-2">Ver Detalles</span>
                          <ArrowRight size={24} className="md:w-7 md:h-7" />
                        </Link>
                      </div>
                    </div>
                  </div>
                  
                  <div className="hidden lg:flex lg:col-span-2 bg-gray-50 rounded-[3rem] border border-gray-200 p-12 flex-col justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setActiveFeaturedIndex((activeFeaturedIndex + 1) % featuredProducts.length)}>
                    <p className="text-gray-400 font-bold text-sm uppercase mb-6 tracking-widest">Siguiente Producto</p>
                    <h4 className="text-3xl font-bold text-gray-400 mb-4 line-clamp-3">{featuredProducts[(activeFeaturedIndex + 1) % featuredProducts.length]?.name}</h4>
                    <div className="w-16 h-1 bg-gray-200 rounded-full mt-4"></div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
            
            <div className="absolute -bottom-12 md:-bottom-16 left-1/2 -translate-x-1/2 flex space-x-3 md:space-x-4">
              {featuredProducts.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveFeaturedIndex(idx)}
                  className={`h-2.5 md:h-3 rounded-full transition-all duration-500 ${idx === activeFeaturedIndex ? 'w-10 md:w-16 bg-primary' : 'w-2.5 md:w-4 bg-gray-200 hover:bg-gray-300'}`}
                  aria-label={`Ir a la diapositiva ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 bg-white relative overflow-hidden border-t border-gray-100">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-widest mb-2 block">Respaldados por los mejores</span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900">Alianzas Estratégicas</h2>
            <p className="mt-4 text-lg text-gray-500 max-w-2xl mx-auto">
              Nuestros productos están presentes en las redes farmacéuticas más importantes y prestigiosas del país.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
            <ChainLogo name="Farmacia Carol" />
            <ChainLogo name="GBC" />
            <ChainLogo name="Farmacia Los Hidalgos" />
            <ChainLogo name="FarmaValue" />
          </div>
        </div>
      </section>

      <section className="py-32 bg-primary text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}><StatItem value="10+" label="Años de Experiencia" /></motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}><StatItem value="50+" label="Farmacias Aliadas" /></motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}><StatItem value="100%" label="Calidad Certificada" /></motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.4 }}><StatItem value="24h" label="Logística de Precisión" /></motion.div>
          </div>
        </div>
      </section>

      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}>
              <FeatureCard 
                icon={<ShieldCheck size={40} />}
                title="Calidad Garantizada"
                desc="Todos nuestros medicamentos cumplen con las más estrictas normativas sanitarias y controles de calidad."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.2 }}>
              <FeatureCard 
                icon={<Truck size={40} />}
                title="Logística Especializada"
                desc="Distribución a nivel nacional con un sistema de entregas ágil y confiable para asegurar la disponibilidad de productos."
              />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
              <FeatureCard 
                icon={<Clock size={40} />}
                title="Entregas Rápidas"
                desc="Compromiso de entrega en 24/48 horas para asegurar el abastecimiento continuo de su establecimiento."
              />
            </motion.div>
          </div>
        </div>
      </section>
    </motion.div>
  );
}

function MarqueeText() {
  return (
    <>
      <span className="text-white/90 font-black text-2xl md:text-3xl uppercase tracking-widest">Calidad Garantizada</span>
      <span className="text-white/50 text-3xl">•</span>
      <span className="text-white/90 font-black text-2xl md:text-3xl uppercase tracking-widest">Distribución Nacional</span>
      <span className="text-white/50 text-3xl">•</span>
      <span className="text-white/90 font-black text-2xl md:text-3xl uppercase tracking-widest">Confianza Médica</span>
      <span className="text-white/50 text-3xl">•</span>
      <span className="text-white/90 font-black text-2xl md:text-3xl uppercase tracking-widest">Innovación Constante</span>
      <span className="text-white/50 text-3xl">•</span>
    </>
  );
}

function ChainLogo({ name }: { name: string }) {
  const getLogo = (name: string) => {
    switch(name) {
      case 'Farmacia Carol': return logoCarol;
      case 'GBC': return logoGBC;
      case 'Farmacia Los Hidalgos': return logoHidalgos;
      case 'FarmaValue': return logoValue;
      default: return null;
    }
  };

  const logoUrl = getLogo(name);

  return (
    <motion.div 
      whileHover={{ scale: 1.05 }}
      className="w-full flex justify-center cursor-pointer group"
    >
      <div className="w-full max-w-[200px] h-28 flex items-center justify-center p-4 transition-all duration-300">
        {logoUrl ? (
          <img 
            src={logoUrl} 
            alt={name} 
            className="max-h-full max-w-full object-contain transition-transform duration-500 mix-blend-multiply"
          />
        ) : (
          <span className="font-bold text-gray-400 group-hover:text-primary transition-colors text-center">{name}</span>
        )}
      </div>
    </motion.div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="group p-6 rounded-3xl hover:bg-white/5 transition-colors">
      <p className="text-6xl md:text-7xl font-black mb-2 text-white drop-shadow-xl tracking-tighter">{value}</p>
      <p className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm opacity-90">{label}</p>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
  return (
    <div className="bg-white p-10 rounded-[2.5rem] shadow-sm border border-gray-100 hover:shadow-2xl transition-all duration-500 group">
      <div className="w-16 h-16 bg-primary/10 text-primary rounded-2xl flex items-center justify-center mb-8 group-hover:bg-primary group-hover:text-white transition-all duration-500 rotate-3 group-hover:rotate-0">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-500 text-lg leading-relaxed">{desc}</p>
    </div>
  );
}




function ProductsView() {
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
        <title>Catálogo de Productos | J. Barreiro & CO</title>
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
                          
                          {/* ETIQUETA X5 / OFERTA ADENTRO DEL CONTENEDOR Y CON ESTILO BLANCO/VERDE */}
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
                            {/* BOTÓN AL ESTILO DE TU REFERENCIA */}
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

function ProductDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Helmet>
          <title>Producto no encontrado | J. Barreiro</title>
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <p className="text-gray-500 mb-8">El producto que buscas no existe o ha sido retirado.</p>
        <button 
          onClick={() => navigate('/productos')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver al catálogo
        </button>
      </div>
    );
  }

  const formatActiveIngredient = (text: string) => {
    return text.replace(/MG/gi, 'mg').trim();
  };

  // Misma lógica actualizada para la vista individual
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

  const isTaldroFast = product.id.startsWith('taldro-fast');
  const descriptionParts = product.description.split('.');
  const activeIngredientRaw = descriptionParts[0];
  const activeIngredient = isTaldroFast ? formatActiveIngredient(activeIngredientRaw) : '';
  const detailDescription = isTaldroFast
    ? descriptionParts.slice(1).join('.').trim()
    : product.description;

  const { baseName, presentation } = getProductPresentation(product.name);
  const isSuspension = product.id === 'hematocri-suspension';

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Helmet>
        <title>{product.name} | Medicamentos J. Barreiro</title>
        <meta name="description" content={`${product.name} - ${product.description}. Distribuidora farmacéutica en República Dominicana.`} />
        <meta name="keywords" content={`${product.name}, ${baseName}, medicamentos, farmacia, República Dominicana`} />
        <link rel="canonical" href={`https://jbarreiro.com.do/productos/${product.id}`} />
        
        {/* Open Graph para redes sociales */}
        <meta property="og:title" content={`${product.name} | Medicamentos J. Barreiro`} />
        <meta property="og:description" content={product.description} />
        <meta property="og:image" content={getCloudinaryUrl(product.id)} />
        <meta property="og:url" content={`https://jbarreiro.com.do/productos/${product.id}`} />
        <meta property="og:type" content="product" />
        
        {/* Structured Data para Google (Product Schema) */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Product",
            "name": product.name,
            "description": product.description,
            "image": getCloudinaryUrl(product.id),
            "brand": {
              "@type": "Brand",
              "name": "J. Barreiro & CO"
            },
            "manufacturer": {
              "@type": "Organization",
              "name": "J. Barreiro & CO",
              "url": "https://jbarreiro.com.do"
            },
            "url": `https://jbarreiro.com.do/productos/${product.id}`,
            "offers": {
              "@type": "Offer",
              "price": product.price.replace(/[\$,]/g, ''),
              "priceCurrency": "DOP",
              "availability": "https://schema.org/InStock",
              "url": `https://jbarreiro.com.do/productos/${product.id}`
            }
          })}
        </script>
      </Helmet>

      <button 
        onClick={() => navigate('/productos')}
        className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
      >
        <ArrowLeft className="mr-2" size={18} />
        Volver a productos
      </button>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          <div className="bg-gray-50/50 h-96 md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 p-12 relative overflow-hidden">
            <img 
              src={getCloudinaryUrl(product.id)} 
              alt={baseName}
              className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 hover:scale-105 mix-blend-multiply"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <Pill size={120} className="text-gray-200 absolute z-0 opacity-40" />
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">
            
            <div className="mb-6 flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border ${
                isSuspension ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-primary/10 text-primary border-primary/20'
              }`}>
                {isSuspension ? 'Suspensión Oral' : 'Comprimidos'}
              </span>
              {/* <span className="inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold bg-blue-50 text-blue-600 uppercase tracking-widest border border-blue-100">
                Calidad Certificada
              </span> */}
            </div>
            
            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight inline-block mr-3">
                {baseName}
              </h1>
              {presentation && (
                <span className="inline-block text-2xl sm:text-3xl font-black text-gray-400 align-text-bottom pb-1">
                  {presentation}
                </span>
              )}
            </div>
            
            {isTaldroFast && (
              <div className="relative pl-6 py-2 mb-8">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full"></div>
                <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Principio Activo</p>
                <p className="text-xl font-bold text-gray-800">{activeIngredient}</p>
              </div>
            )}

            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              {detailDescription || "Medicamento de alta calidad distribuido por J. Barreiro."}
            </p>
            
            <div className="mt-auto pt-8 border-t border-gray-100">
              <button 
                onClick={() => navigate('/contacto')}
                className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-xl font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-[0_8px_20px_-6px_rgba(27,166,75,0.4)] transform hover:-translate-y-1"
              >
                Contactar para cotizar
              </button>
              <p className="text-center text-sm text-gray-400 mt-5 flex items-center justify-center">
                <ShieldCheck size={16} className="mr-2 text-primary" /> Venta exclusiva a establecimientos autorizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

function ContactView() {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[#f8fafc] min-h-screen pb-24 relative overflow-hidden"
    >
      {/* Header Dinámico y Luminoso (Tamaño estandarizado con la web) */}
      <div className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-white border-b border-gray-100 shadow-sm z-10">
        
        {/* Fondo decorativo dinámico pero sutil */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] md:w-[800px] h-[60vw] md:h-[400px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] md:w-[400px] h-[50vw] md:h-[400px] bg-emerald-400/10 rounded-full blur-[100px] transform translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        </div>
        
        {/* Formas farmacéuticas flotantes restauradas y adaptadas a fondo claro */}
        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] text-primary/10 blur-[1px] hidden md:block"
        >
          <Pill size={100} />
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[10%] text-emerald-500/10 blur-[2px] hidden md:block"
        >
          <ShieldCheck size={120} />
        </motion.div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-6 md:mt-0">
          
          {/* Etiqueta de status con pulso verde restaurada */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6 md:mb-8"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 mr-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </span>
            <span className="text-gray-500 font-bold text-xs uppercase tracking-[0.15em]">Equipo de ventas en línea</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-black text-gray-900 tracking-tighter leading-[1.1] mb-6"
          >
            Hablemos de <br className="md:hidden" />
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 pr-2">
                Negocios
              </span>
              {/* Subrayado curvo restaurado */}
              <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-emerald-300/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed"
          >
            Tu farmacia merece <strong className="text-gray-900 font-extrabold">calidad y abastecimiento continuo</strong>. Nuestro equipo está listo para ayudarte a crecer.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 relative z-20">
        
        {/* Grid de Tarjetas de Contacto Estáticas */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h-full">
            <ContactCard 
              icon={<Phone className="text-white" size={24} strokeWidth={2.5} />}
              title="Línea Principal"
              value="809 980 8810"
              desc="Lunes a Viernes, 8:00 AM - 5:00 PM"
              href="tel:8099808810"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="h-full">
            <ContactCard 
              icon={
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
              title="Ventas Directas"
              value="809 909 2606"
              desc="Respuesta rápida en < 1 hora"
              href="https://wa.me/18099092606"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="h-full">            
            <ContactCard 
              icon={<Mail className="text-white" size={24} strokeWidth={2.5} />}
              title="Email Corporativo"
              value="jbarreiro.co@gmail.com"
              desc="Cotizaciones y logística"
              href="mailto:jbarreiro.co@gmail.com"
            />
          </motion.div>
        </div>

        {/* Sección de Sede y Mapa */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          {/* Columna Izquierda: Información */}
          <div className="lg:col-span-5 flex flex-col justify-center pt-4">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Nuestra Sede</h3>
            
            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden flex items-start">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-gray-900 mb-2">Dirección Principal</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Manzana 8 No. 19, Ciudad Colosal<br/>
                    Santo Domingo, República Dominicana
                  </p>
                </div>
              </div>
              
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden flex items-start">
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-gray-900 mb-2">Distribución Nacional</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Nuestra red logística cubre todo el territorio nacional, garantizando disponibilidad en las principales cadenas de farmacias.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Mapa */}
          <div className="lg:col-span-7 h-[400px] md:h-[500px] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner relative border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.455049393656!2d-69.7896493!3d18.508327599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87f41177423f%3A0xa20e45aa0ee936b0!2sJ.%20Barreiro%20%26%20CO.%20S.R.L!5e0!3m2!1ses-419!2sdo!4v1772326455098!5m2!1ses-419!2sdo"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
            />
          </div>
        </motion.div>
      </div>

      <Helmet>
        <title>Contacto | J. Barreiro & CO</title>
        <meta name="description" content="Contacta a J. Barreiro & CO para cotización y distribución mayorista de medicamentos en República Dominicana." />
        <link rel="canonical" href="https://jbarreiro.com.do/contacto" />
        <meta property="og:title" content="Contacto | J. Barreiro & CO" />
        <meta property="og:url" content="https://jbarreiro.com.do/contacto" />
        <meta property="og:type" content="website" />
      </Helmet>
    </motion.div>
  );
}

function ContactCard({ icon, title, value, desc, href }: { icon: React.ReactNode; title: string; value: string; desc: string; href: string }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group flex flex-col h-full bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      <div className="flex items-start justify-between mb-6">
        <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center shadow-md">
          {icon}
        </div>
        <div className="text-gray-300 group-hover:text-primary transition-colors duration-300 mt-1">
          <ArrowRight size={20} className="-rotate-45" />
        </div>
      </div>
      <h4 className="text-[10px] font-extrabold text-gray-400 uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-2xl xl:text-[1.7rem] font-black text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight truncate">
        {value}
      </p>
      <div className="mt-auto pt-6">
        <p className="text-sm font-medium text-gray-500">{desc}</p>
      </div>
    </a>
  );
}