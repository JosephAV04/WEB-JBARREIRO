import React, { useState, useMemo, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useNavigate, useParams, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Pill, Phone, Mail, MapPin, Menu, X, ArrowRight, ShieldCheck, Truck, Clock, CheckCircle2, Search, ArrowLeft, Building2, Instagram, Facebook, Twitter } from 'lucide-react';
import logoEmpresa from './assets/JBarreiro.png';
import logoCarol from './assets/LogoCarol.png';
import logoGBC from './assets/LogoGBC.png';
import logoHidalgos from './assets/LogoHidalgos.png';
import logoValue from './assets/LogoValue.png';
import miniLogo from './assets/MiniLogo.jpg';

const productsData = [
  { id: 'barre-itis-5', name: 'BARRE-ITIS X 5 capletas', description: 'Azitromicina 500 mg. Antibiótico de amplio espectro para el tratamiento de diversas infecciones bacterianas.', price: '$769.00' },
  { id: 'barre-itis-20', name: 'BARRE-ITIS X 20 capletas', description: 'Azitromicina 500 mg. Antibiótico de amplio espectro para el tratamiento de diversas infecciones bacterianas.', price: '$3,076.00' },
  { id: 'barre-pm-100', name: 'BARRE PM X 100 comprimidos', description: 'Amitriptilina 25 mg. Antidepresivo tricíclico utilizado también para el tratamiento del dolor crónico y prevención de migrañas.', price: '$2,000.00' },
  { id: 'blindada-1', name: 'BLINDADA X 1 comprimido', description: 'Levonorgestrel 1.5 mg. Anticonceptivo de emergencia de dosis única, eficaz para prevenir el embarazo tras una relación sin protección.', price: '$99.00' },
  { id: 'clp-30', name: 'CLP X 30 TABLETAS OFERTA 2X1', description: 'Clopidogrel 75mg. Antiagregante plaquetario indicado para la prevención de eventos aterotrombóticos.', price: '$1,990.00' },
  { id: 'dic-b-10', name: 'DIC-B X 10 capletas', description: 'Diclofenac con vitaminas del complejo B. Combinación analgésica, antiinflamatoria y neurotrópica.', price: '$500.00' },
  { id: 'dic-b-100', name: 'DIC-B X 100 capletas', description: 'Diclofenac con vitaminas del complejo B. Combinación analgésica, antiinflamatoria y neurotrópica.', price: '$4,000.00' },
  { id: 'dic-b-relax-20', name: 'DIC-B RELAX X 20 CAPLETAS', description: 'Diclofenac con vitaminas del complejo B. Formulación diseñada para el alivio del dolor inflamatorio con componente neurítico.', price: '$1,000.00' },
  { id: 'flexi-move-100', name: 'FLEXI-MOVE X 100 Tabletas', description: 'Meloxicam 15 mg. Antiinflamatorio no esteroideo (AINE) indicado para el tratamiento de la artritis y osteoartritis.', price: '$2,000.00' },
  { id: 'hematocri-30', name: 'HEMATOCRI X 30 comprimidos', description: '132mg Hierro con 1mg Acido Fólico. Suplemento antianémico para el tratamiento y prevención de deficiencias de hierro.', price: '$990.00' },
  { id: 'hematocri-100', name: 'HEMATOCRI X 100 comprimidos', description: '132mg Hierro con 1mg Acido Fólico. Suplemento antianémico para el tratamiento y prevención de deficiencias de hierro.', price: '$2,990.00' },
  { id: 'hematocri-suspension', name: 'HEMATOCRI SUSPENSION', description: '132mg Hierro con 1mg Acido Fólico en suspensión. Ideal para pacientes con dificultad para deglutir comprimidos.', price: '$990.00' },
  { id: 'ibone-oferta', name: 'IBONE OFERTA (2X1)', description: 'Ibandronato 150 mg. Bifosfonato indicado para el tratamiento y prevención de la osteoporosis en mujeres posmenopáusicas.', price: '$2,990.00' },
  { id: 'jb-prazol-50', name: 'JB PRAZOL 40MG X 50 TABLETAS', description: 'Esomeprazol. Inhibidor de la bomba de protones indicado para el tratamiento del reflujo gastroesofágico y úlceras gástricas.', price: '$3,500.00' },
  { id: 'levobacter-500-20', name: 'LEVOBACTER 500mg X 20 capletas', description: 'Levofloxacina 500 mg. Antibiótico quinolona de amplio espectro para infecciones respiratorias, urinarias y de piel.', price: '$2,500.00' },
  { id: 'levobacter-750-20', name: 'LEVOBACTER 750mg X 20 capletas', description: 'Levofloxacina 750 mg. Antibiótico quinolona de alta potencia para infecciones bacterianas severas.', price: '$3,000.00' },
  { id: 'lumdocer-30', name: 'LUMDOCER X 30 CAPLETAS', description: 'Pregabalina. Modulador del dolor neuropático y coadyuvante en el tratamiento de la epilepsia y ansiedad generalizada.', price: '$1,990.00' },
  { id: 'melocox2-10', name: 'MELOCOX2 X 10 comprimidos', description: 'Meloxicam 15mg. Potente antiinflamatorio y analgésico indicado para afecciones osteoarticulares.', price: '$600.00' },
  { id: 'melocox2-50', name: 'MELOCOX2 X 50 comprimidos', description: 'Meloxicam 15mg. Potente antiinflamatorio y analgésico indicado para afecciones osteoarticulares.', price: '$3,000.00' },
  { id: 'melocox2-100', name: 'MELOCOX2 X 100 comprimidos', description: 'Meloxicam 15mg. Potente antiinflamatorio y analgésico indicado para afecciones osteoarticulares.', price: '$5,000.00' },
  { id: 'taladro-50', name: 'TALADRO X 50 TABLETAS', description: 'Tadalafil 20 mg. Indicado para el tratamiento de la disfunción eréctil y síntomas de la hiperplasia benigna de próstata.', price: '$2,000.00' },
  { id: 'taldro-5mg-30', name: 'TALDRO 5MG X 30 TABLETAS', description: 'Tadalafil 5 mg. Dosis diaria recomendada para el tratamiento continuo de la disfunción eréctil.', price: '$1,990.00' },
  { id: 'xib-p-10', name: 'XIB-P X 10 CAPLETAS', description: 'Mezcla de Celecoxib 200mg con Pregabalina. Combinación sinérgica para el manejo del dolor inflamatorio y neuropático.', price: '$1,100.00' },
  { id: 'xib-p-50', name: 'XIB-P X 50 CAPLETAS', description: 'Mezcla de Celecoxib 200mg con Pregabalina. Combinación sinérgica para el manejo del dolor inflamatorio y neuropático.', price: '$4,500.00' },
  { id: 'xib-200mg-50', name: 'XIB 200MG X 50 CAPSULAS', description: 'Celecoxib 200mg. Inhibidor selectivo de la COX-2 indicado para el alivio del dolor y la inflamación.', price: '$3,000.00' },
  { id: 'xib-400mg-50', name: 'XIB 400MG X 50 CAPSULAS', description: 'Celecoxib 400mg. Dosis reforzada para el tratamiento de procesos inflamatorios agudos y severos.', price: '$3,500.00' },
];

//CLOUDINARY
const IMAGE_MAP: Record<string, string> = {
  'barre-itis-5': 'barre-itis-5',
  'barre-pm-100': 'BARRE PM X100',
  'blindada-1': 'BLINDADA',
  'clp-30': 'CLP',
  'dic-b-10': 'DIC-B X10',
  'flexi-move-100': 'FLEXI-MOVE',
  'hematocri-suspension': 'HEMATOCRI SUSPENSION',
  'hematocri-100': 'HEMATOCRI',
  'ibone-oferta': 'IBONE',
  'levobacter-500-20': 'LEVOBACTER 500MG',
  'levobacter-750-20': 'LEVOBACTER 750MG',
  'lumdocer-30': 'LUMDOCER',
  'taladro-50': 'TALADRO',
  'taldro-5mg-30': 'TALDRO 5mg',
  'melocox2-100': 'MELOCOX2 X100',
  'xib-p-10': 'XIB P',
  'xib-p-50': 'XIB P',
  'xib-200mg-50': 'XIB 200mg',
  'xib-400mg-50': 'XIB 400mg x50'  
};

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 pb-16 md:pb-0">
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
        
        {/* WhatsApp FAB */}
        <a 
          href="https://wa.me/18097651953" 
          target="_blank" 
          rel="noopener noreferrer"
          className="fixed bottom-20 right-6 md:bottom-8 md:right-8 z-40 bg-[#25D366] text-white p-4 rounded-full shadow-xl hover:scale-110 transition-transform duration-300 flex items-center justify-center group"
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
          <BottomNavLink to="/" icon={<Clock size={24} />} label="Inicio" />
          <BottomNavLink to="/productos" icon={<Pill size={24} />} label="Productos" />
          <BottomNavLink to="/contacto" icon={<Mail size={24} />} label="Contacto" />
        </div>
      </div>
    </Router>
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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const isActive = (path: string) => {
    if (path === '/' && location.pathname !== '/') return false;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return location.pathname === path;
  };

  const closeMenu = () => setIsMobileMenuOpen(false);

  // Efecto para reducir sutilmente el header al hacer scroll
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`bg-primary sticky top-0 z-50 transition-all duration-500 border-b border-primary-dark/20 ${scrolled ? 'shadow-xl' : ''}`}>
      {/* Contenedor sin márgenes laterales (fluido) */}
      <div className="w-full pl-0 pr-4 sm:pr-6 lg:pr-12">
        <div className={`flex justify-between items-stretch transition-all duration-500 ${scrolled ? 'h-16 md:h-20' : 'h-20 md:h-28'}`}>
          
          {/* SECCIÓN DEL LOGOTIPO */}
          <Link to="/" className="relative flex items-center h-full cursor-pointer group" onClick={closeMenu}>
            {/* Fondo blanco absoluto expandido para eliminar la línea verde de subpíxeles */}
            <motion.div 
              className="absolute -top-[2px] -bottom-[2px] -left-[20px] right-0 bg-white shadow-[10px_0_30px_rgba(0,0,0,0.15)] transition-all duration-500 group-hover:-right-[16px]"
              style={{
                clipPath: "polygon(0 0, 100% 0, calc(100% - 25px) 100%, 0% 100%)" // Corte diagonal derecho
              }}
            />
            {/* Contenedor de la imagen por encima del fondo blanco */}
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
            <Link 
              to="/" 
              className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              Inicio
            </Link>
            <Link 
              to="/productos" 
              className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/productos') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              Productos
            </Link>
            <Link 
              to="/contacto" 
              className={`px-6 flex items-center h-full text-lg font-bold transition-all duration-300 border-b-[6px] ${isActive('/contacto') ? 'border-white bg-white/10 text-white' : 'border-transparent text-white/80 hover:border-white/50 hover:bg-white/5 hover:text-white'}`}
            >
              Contacto
            </Link>
          </nav>

          {/* Botón de Menú Móvil */}
          <div className="md:hidden flex items-center h-full">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white hover:bg-white/10 p-3 rounded-2xl transition-colors focus:outline-none"
              aria-label="Menu"
            >
              {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Menú Móvil */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#188031] border-t border-white/10 overflow-hidden shadow-2xl"
          >
            <div className="px-4 py-6 space-y-2 flex flex-col">
              <Link 
                to="/" 
                onClick={closeMenu} 
                className={`block px-6 py-4 rounded-2xl text-lg font-bold transition-colors ${isActive('/') ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
              >
                Inicio
              </Link>
              <Link 
                to="/productos" 
                onClick={closeMenu} 
                className={`block px-6 py-4 rounded-2xl text-lg font-bold transition-colors ${isActive('/productos') ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
              >
                Productos
              </Link>
              <Link 
                to="/contacto" 
                onClick={closeMenu} 
                className={`block px-6 py-4 rounded-2xl text-lg font-bold transition-colors ${isActive('/contacto') ? 'bg-white text-primary' : 'text-white hover:bg-white/10'}`}
              >
                Contacto
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
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
              Distribuidora farmacéutica líder en medicamentos comprimidos. Elevando el estándar de salud en la República Dominicana.
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
                  <p className="text-gray-300 font-medium">809 890 8810</p>
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
      {/* Dynamic Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-gray-50">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <motion.div 
            animate={{ 
              rotate: 360,
              scale: [1, 1.1, 1],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-3xl"
          />
          <motion.div 
            animate={{ 
              rotate: -360,
              scale: [1, 1.2, 1],
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute -bottom-[20%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-emerald-400/10 to-transparent blur-3xl"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >

              <h1 className="text-6xl md:text-8xl font-extrabold text-gray-900 leading-[0.95] mb-8 tracking-tighter">
                Salud y <span className="text-primary italic">Confianza</span> en cada dosis.
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-10 max-w-lg font-medium">
                Abastecemos a las principales cadenas de farmacias con medicamentos de la más alta calidad.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={() => navigate('/productos')}
                  className="px-10 py-5 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-xl shadow-primary/20 flex items-center justify-center group text-lg"
                >
                  Explorar Catálogo
                  <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" size={24} />
                </button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="relative hidden lg:block"
            >
              <div className="relative z-10 bg-white rounded-[3rem] p-8 shadow-2xl border border-gray-100 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[4/5] rounded-[2rem] bg-gray-50 flex items-center justify-center overflow-hidden relative group">
                  <img src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?q=80&w=2069&auto=format&fit=crop" alt="Laboratorio" className="absolute inset-0 w-full h-full object-cover opacity-80 mix-blend-multiply group-hover:scale-105 transition-transform duration-700" />
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent mix-blend-multiply"></div>
                  <div className="absolute bottom-8 left-8 right-8 bg-white/95 backdrop-blur-md p-6 rounded-2xl shadow-lg border border-white/50 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                    <p className="text-primary font-bold text-sm uppercase mb-1 tracking-widest">Compromiso J. Barreiro</p>
                    <p className="text-gray-900 font-extrabold text-2xl leading-tight">Calidad Farmacéutica Superior</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Infinite Marquee Text */}
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

      {/* Featured Products Carousel Section */}
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

          {/* Contenedor del Carrusel Ajustado para Móvil */}
          <div className="relative min-h-[600px] md:min-h-[550px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFeaturedIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 grid grid-cols-1 lg:grid-cols-5 gap-8"
              >
                {/* Tarjeta Principal del Producto */}
                <div className="lg:col-span-3 bg-gray-50 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border border-gray-100 flex flex-col md:flex-row group h-full">
                  
                  {/* Área de Imagen: Cuadrada en móvil, mitad del ancho en desktop */}
                  <div className="w-full md:w-1/2 bg-white flex items-center justify-center p-8 md:p-12 relative overflow-hidden aspect-square md:aspect-auto">
                    <div className="absolute inset-0 bg-primary/5 transform -skew-x-12 translate-x-full group-hover:translate-x-0 transition-transform duration-700"></div>
                      <div className="w-full h-full bg-white rounded-[1.5rem] md:rounded-[2rem] shadow-inner flex items-center justify-center relative z-10 group-hover:scale-105 transition-transform duration-500 overflow-hidden p-4">
                        <img 
                          src={getCloudinaryUrl(featuredProducts[activeFeaturedIndex].id)} 
                          alt={featuredProducts[activeFeaturedIndex].name}
                          className="max-w-full max-h-full object-contain relative z-10"
                          loading="eager"
                          onError={(e) => {
                            e.currentTarget.style.opacity = '0';
                          }}
                        />
                        <Pill size={80} className="text-gray-100 absolute z-0 opacity-40 md:w-[100px] md:h-[100px]" />
                      </div>
                    </div>
                  
                  {/* Área de Texto: Ajuste de padding y tipografía para móvil */}
                  <div className="w-full md:w-1/2 p-8 md:p-12 flex flex-col justify-center bg-gray-50">
                    <span className="text-primary font-bold text-xs md:text-sm uppercase tracking-widest mb-3 md:mb-4 block">Destacado</span>
                    <h3 className="text-2xl md:text-4xl font-extrabold text-gray-900 mb-4 md:mb-6 leading-tight line-clamp-2 md:line-clamp-none">{featuredProducts[activeFeaturedIndex].name}</h3>
                    <p className="text-gray-500 text-base md:text-xl mb-6 md:mb-10 line-clamp-3 md:line-clamp-4 font-light">{featuredProducts[activeFeaturedIndex].description}</p>
                    <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-200 md:border-none md:pt-0">
                      <span className="text-2xl md:text-4xl font-black text-primary">{featuredProducts[activeFeaturedIndex].price}</span>
                      <Link 
                        to={`/productos/${featuredProducts[activeFeaturedIndex].id}`}
                        className="p-3 md:p-5 bg-white text-primary rounded-xl md:rounded-2xl hover:bg-primary hover:text-white transition-all shadow-md"
                      >
                        <ArrowRight size={24} className="md:w-7 md:h-7" />
                      </Link>
                    </div>
                  </div>
                </div>
                
                {/* Previsualización del Siguiente Producto (Oculto en móvil) */}
                <div className="hidden lg:flex lg:col-span-2 bg-gray-50 rounded-[3rem] border border-gray-200 p-12 flex-col justify-center opacity-80 hover:opacity-100 transition-opacity cursor-pointer" onClick={() => setActiveFeaturedIndex((activeFeaturedIndex + 1) % featuredProducts.length)}>
                  <p className="text-gray-400 font-bold text-sm uppercase mb-6 tracking-widest">Siguiente Producto</p>
                  <h4 className="text-3xl font-bold text-gray-400 mb-4 line-clamp-3">{featuredProducts[(activeFeaturedIndex + 1) % featuredProducts.length].name}</h4>
                  <div className="w-16 h-1 bg-gray-200 rounded-full mt-4"></div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            {/* Indicadores del Carrusel (Ajustados para no solaparse) */}
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

      {/* Trust Section - Pharmacy Chains Marquee */}
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
          
          {/* Se implementa un Grid para un alineamiento responsivo perfecto */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
            <ChainLogo name="Farmacia Carol" />
            <ChainLogo name="GBC" />
            <ChainLogo name="Farmacia Los Hidalgos" />
            <ChainLogo name="FarmaValue" />
          </div>
        </div>
      </section>

      {/* Stats Section */}
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

      {/* Features Section */}
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
                desc="Distribución a nivel nacional con control de temperatura y trazabilidad completa de cada lote."
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



const getCloudinaryUrl = (productId: string) => {
  const cloudName = 'didhygevw'; // Tu cuenta
  const fileName = IMAGE_MAP[productId] || productId;
  
  return `https://res.cloudinary.com/${cloudName}/image/upload/f_auto,q_auto,c_pad,w_600,h_600/catalogo_productos/${encodeURIComponent(fileName)}`;
};

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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-gray-50 min-h-screen pb-24"
    >
      {/* Premium Header */}
      <div className="bg-white border-b border-gray-200 pt-20 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl font-extrabold text-gray-900 mb-6 tracking-tight"
          >
            Nuestros <span className="text-primary italic">Productos</span>
          </motion.h2>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {/* Panel Dinámico de Confianza B2B */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="max-w-4xl mx-auto mb-12 bg-white rounded-[2rem] p-2 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent pointer-events-none" />
            
            <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-gray-100 relative z-10">
              {/* Indicador 1: Logística */}
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-xl md:rounded-none md:rounded-l-xl cursor-default">
                <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center text-primary shrink-0">
                  <Truck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Logística</p>
                  <p className="text-sm font-bold text-gray-900">Entrega en 24/48h</p>
                </div>
              </div>

              {/* Indicador 2: Garantía */}
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors cursor-default">
                <div className="w-12 h-12 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500 shrink-0">
                  <ShieldCheck size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Garantía</p>
                  <p className="text-sm font-bold text-gray-900">Lotes Certificados</p>
                </div>
              </div>

              {/* Indicador 3: Disponibilidad */}
              <div className="flex items-center gap-4 p-4 hover:bg-gray-50/50 transition-colors rounded-xl md:rounded-none md:rounded-r-xl cursor-default">
                <div className="w-12 h-12 bg-emerald-50 rounded-2xl flex items-center justify-center text-emerald-600 shrink-0 relative">
                  {/* Punto verde animado (Ping) */}
                  <span className="absolute -top-1 -right-1 flex h-4 w-4">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white"></span>
                  </span>
                  <CheckCircle2 size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Disponibilidad</p>
                  <p className="text-sm font-bold text-gray-900">Stock Actualizado</p>
                </div>
              </div>
            </div>
          </motion.div>
        
        {/* Advanced Search Bar */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="max-w-4xl mx-auto mb-20"
        >
          <div className="relative group flex items-center bg-white p-2 rounded-[2.5rem] shadow-[0_20px_50px_-12px_rgba(0,0,0,0.1)] border border-gray-100 hover:shadow-[0_20px_50px_-12px_rgba(32,167,64,0.15)] hover:border-primary/30 transition-all duration-500">
            <div className="pl-6 pr-4 flex items-center justify-center">
              <Search className="h-7 w-7 text-primary/50 group-focus-within:text-primary transition-colors" />
            </div>
            <input
              type="text"
              className="block w-full py-5 border-0 bg-transparent placeholder-gray-400 focus:outline-none focus:ring-0 text-xl text-gray-900 font-medium"
              placeholder="Buscar medicamento, principio activo..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setDisplayCount(16);
              }}
            />
            <div className="pr-2 hidden sm:block">
              <button className="bg-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-primary-dark transition-colors shadow-md shadow-primary/20 whitespace-nowrap">
                Buscar
              </button>
            </div>
          </div>
        </motion.div>

        {filteredProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] shadow-sm border border-gray-100">
            <Pill className="mx-auto h-16 w-16 text-gray-300 mb-4" />
            <p className="text-gray-500 text-xl font-medium">No encontramos coincidencias.</p>
            <button 
              onClick={() => setSearchTerm('')}
              className="mt-6 px-6 py-2 bg-primary/10 text-primary font-bold rounded-full hover:bg-primary hover:text-white transition-colors"
            >
              Ver todo el catálogo
            </button>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {visibleProducts.map((product, index) => {
                const activeIngredient = product.description.split('.')[0];
                return (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    key={product.id}
                  >
                    <Link to={`/productos/${product.id}`} className="block h-full">
                      <div className="bg-white rounded-[2.5rem] p-3 shadow-sm border border-gray-100 hover:shadow-[0_20px_40px_-15px_rgba(32,167,64,0.15)] hover:border-primary/20 transition-all duration-500 flex flex-col h-full group">
                        
                        {/* Image Area */}
                        <div className="w-full h-56 bg-white rounded-[2rem] flex items-center justify-center relative overflow-hidden mb-4 p-4 shadow-inner">
                          <img 
                            src={getCloudinaryUrl(product.id)} 
                            alt={product.name}
                            loading="lazy" 
                            className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-110 relative z-10"
                            onError={(e) => {
                              // Fallback: Si no hay imagen, ocultamos la etiqueta para que se vea el Pill de fondo
                              e.currentTarget.style.opacity = '0';
                            }}
                          />
                          
                          {/* El Pill ahora solo se ve si la imagen falla al cargar */}
                          <Pill className="text-gray-100 w-20 h-20 absolute z-0 opacity-50" />
                          
                          <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"></div>
                          
                          {/* Hover Overlay */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/20 backdrop-blur-[2px] z-30">
                            <div className="bg-white text-primary font-bold px-6 py-3 rounded-full shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 flex items-center">
                              Ver detalles <ArrowRight size={18} className="ml-2" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Content Area */}
                        <div className="px-5 pb-5 flex-grow flex flex-col">
                          <div className="mb-3">
                            <span className="inline-block px-3 py-1 bg-gray-100 text-gray-600 text-[10px] font-bold uppercase tracking-widest rounded-full">
                              {activeIngredient}
                            </span>
                          </div>
                          <h3 className="text-xl font-extrabold text-gray-900 mb-2 group-hover:text-primary transition-colors">{product.name}</h3>
                          <p className="text-sm text-gray-500 flex-grow mb-6 line-clamp-2 leading-relaxed">
                            {product.description.split('.').slice(1).join('.').trim() || "Medicamento de alta calidad."}
                          </p>
                          
                          <div className="pt-4 border-t border-gray-100 mt-auto flex items-end justify-between">
                            <div>
                              <span className="block text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Precio Ref.</span>
                              <span className="text-2xl font-black text-primary">{product.price}</span>
                            </div>
                            <div className="w-10 h-10 rounded-full bg-gray-50 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors text-gray-400">
                              <ArrowRight size={20} />
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
                <button 
                  onClick={() => setDisplayCount(prev => prev + 16)}
                  className="inline-flex items-center px-10 py-4 bg-white text-primary border border-gray-200 font-bold rounded-full hover:border-primary hover:shadow-lg hover:shadow-primary/20 transition-all duration-300 text-lg group"
                >
                  Cargar más productos
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
    // ... (Mantén tu código de "Producto no encontrado" igual)
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
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

  const activeIngredient = product.description.split('.')[0];
  const restOfDescription = product.description.split('.').slice(1).join('.');

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <button 
        onClick={() => navigate('/productos')}
        className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium"
      >
        <ArrowLeft className="mr-2" size={20} />
        Volver a productos
      </button>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* SECCIÓN DE LA IMAGEN ACTUALIZADA */}
          <div className="bg-white h-96 md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 p-12 relative overflow-hidden">
            {/* Imagen real desde Cloudinary */}
            <img 
              src={getCloudinaryUrl(product.id)} 
              alt={product.name}
              className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 hover:scale-105"
              onError={(e) => {
                // Si la imagen falla, ocultamos el elemento para mostrar el ícono de respaldo
                e.currentTarget.style.display = 'none';
              }}
            />
            {/* Ícono de respaldo (Pill) que se ve solo si la imagen no carga */}
            <Pill size={120} className="text-gray-50 absolute z-0 opacity-40" />
          </div>

          <div className="p-10 lg:p-16 flex flex-col justify-center">
            {/* ... (El resto de tu código de descripción, precio y botón se mantiene igual) */}
            <div className="mb-4 flex flex-wrap gap-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary uppercase tracking-wider">
                Comprimidos
              </span>
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600 uppercase tracking-wider">
                Calidad Certificada
              </span>
            </div>
            
            <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 mb-2">{product.name}</h1>
            
            <div className="bg-primary/5 border-l-4 border-primary p-4 mb-8 rounded-r-xl">
              <p className="text-xs font-bold text-primary uppercase tracking-widest mb-1">Principio Activo</p>
              <p className="text-xl font-bold text-gray-900 italic">{activeIngredient}</p>
            </div>

            <p className="text-lg text-gray-600 mb-8 leading-relaxed">
              {restOfDescription || "Medicamento de alta calidad distribuido por J. Barreiro."}
            </p>
            
            <div className="mb-8">
              <p className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-1">Precio de Referencia</p>
              <p className="text-4xl font-bold text-primary">{product.price}</p>
            </div>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <button 
                onClick={() => navigate('/contacto')}
                className="w-full flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-primary hover:bg-primary-dark transition-colors shadow-sm"
              >
                Contactar para comprar
              </button>
              <p className="text-center text-sm text-gray-500 mt-4">
                Venta exclusiva a farmacias y centros de salud autorizados.
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
      className="w-full bg-gray-50 min-h-screen pb-24"
    >
      {/* Premium Header */}
      <div className="bg-[#0B1C10] text-white pt-24 pb-32 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-primary via-transparent to-transparent"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.span 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-block px-4 py-1.5 rounded-full bg-white/10 text-primary font-bold text-sm uppercase tracking-widest mb-6 border border-white/10 backdrop-blur-sm"
          >
            Atención Personalizada
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight"
          >
            Hablemos de <span className="text-primary italic">Negocios</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-xl text-gray-400 font-light"
          >
            Estamos listos para abastecer tu farmacia con la mejor calidad del mercado. Nuestro equipo de ventas está a tu disposición.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        {/* Interactive Contact Hub */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <ContactCard 
              icon={<Phone className="text-white" size={32} />}
              title="Línea Principal"
              value="809 890 8810"
              href="tel:8098908810"
              color="bg-primary"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
            <ContactCard 
              icon={
                <svg viewBox="0 0 24 24" width="32" height="32" fill="currentColor" className="text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
              title="Ventas Directas"
              value="809 909 2606"
              href="https://wa.me/18099092606"
              color="bg-[#25D366]"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>            
            <ContactCard 
              icon={
                /* Icono de sobre clásico tipo Gmail */
                <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
              }
              title="Email Corporativo"
              value="jbarreiro.co@gmail.com"
              href="mailto:jbarreiro.co@gmail.com"
              color="bg-[#EA4335]" 
            />
          </motion.div>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden mb-16"
        >
          <div className="grid grid-cols-1 lg:grid-cols-5">
            {/* Location Info */}
            <div className="lg:col-span-2 bg-gray-50 p-12 lg:p-16 flex flex-col justify-center relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32"></div>
              
              <h3 className="text-4xl font-extrabold text-gray-900 mb-10 relative z-10">Nuestra Sede</h3>
              
              <div className="space-y-10 relative z-10">
                <div className="flex items-start group">
                  <div className="bg-white p-4 rounded-2xl mr-6 shadow-sm border border-gray-100 group-hover:border-primary/30 group-hover:shadow-md transition-all">
                    <MapPin className="text-primary" size={32} />
                  </div>
                  <div>
                    <p className="font-bold text-xl text-gray-900 mb-2">Dirección Principal</p>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      Manzana 8 No. 19, Ciudad Colosal<br/>
                      Santo Domingo, República Dominicana
                    </p>
                  </div>
                </div>
                
                <div className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-lg transition-shadow">
                  <div className="flex items-center mb-4">
                    <ShieldCheck className="text-primary mr-3" size={28} />
                    <span className="font-extrabold text-xl text-gray-900">Distribución Nacional</span>
                  </div>
                  <p className="text-gray-500 leading-relaxed">
                    Contamos con una red logística que cubre todo el territorio nacional, garantizando que nuestros productos lleguen a las principales cadenas de farmacias.
                  </p>
                </div>
              </div>
            </div>

            {/* Mapa */}
            <div className="lg:col-span-3 h-[500px] lg:h-auto min-h-[500px] relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.346858276709!2d-69.9885966!3d18.4718609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8ea5610000000001%3A0x6a0b9b8b8b8b8b8b!2sJ.%20Barreiro%20%26%20CO.%20S.R.L!5e0!3m2!1ses!2sdo!4v1700000000000!5m2!1ses!2sdo" 
                width="100%" 
                height="100%" 
                style={{ border: 0 }} 
                allowFullScreen={false} 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación de J. Barreiro"
                className="absolute inset-0"
              ></iframe>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function ContactCard({ icon, title, value, href, color }: { icon: React.ReactNode; title: string; value: string; href: string; color: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="bg-white p-8 rounded-[2rem] shadow-sm border border-gray-100 hover:shadow-xl transition-all duration-300 group flex flex-col items-center text-center"
    >
      <div className={`w-16 h-16 ${color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg`}>
        {icon}
      </div>
      <h4 className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-2">{title}</h4>
      <p className="text-lg font-bold text-gray-900 break-all">{value}</p>
    </a>
  );
}
