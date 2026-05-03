import { Link } from 'react-router-dom';
import { ArrowRight, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-[#0B1C10] text-white relative overflow-hidden pt-24 pb-12 mt-auto">
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
            © {new Date().getFullYear()} JBARREIRO & CO. S.R.L. Todos los derechos reservados.
          </p>

          <div className="hidden md:block">
            <span className="text-primary/50 text-xs uppercase tracking-[0.3em] font-bold">Salud • Confianza • Calidad</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full pointer-events-none select-none flex justify-center opacity-[0.03] z-0 pb-2">
        <span className="text-[12vw] font-black whitespace-nowrap text-white">
          JBARREIRO
        </span>
      </div>
    </footer>
  );
}
