import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'motion/react';
import logoEmpresa from '../../assets/JBarreiro.png';

export default function Navbar() {
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
                alt="JBARREIRO Logo"
                className="h-[60%] sm:h-[70%] w-auto object-contain transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          </Link>

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
