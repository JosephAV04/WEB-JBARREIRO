import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Pill, Mail } from 'lucide-react';

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

export default function BottomNav() {
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 px-6 py-3 flex justify-between items-center shadow-[0_-4px_10px_rgba(0,0,0,0.05)]">
      <BottomNavLink to="/" icon={<Home size={24} />} label="Inicio" />
      <BottomNavLink to="/productos" icon={<Pill size={24} />} label="Productos" />
      <BottomNavLink to="/contacto" icon={<Mail size={24} />} label="Contacto" />
    </div>
  );
}
