import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function ContactCard({ icon, title, value, desc, href }: { icon: React.ReactNode; title: string; value: string; desc: string; href: string }) {
  const isExternal = href.startsWith('http');
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group relative flex flex-col h-full bg-white p-6 md:p-8 rounded-[2rem] border-2 border-gray-100 shadow-[0_4px_20px_-8px_rgba(0,0,0,0.08)] hover:border-primary/40 hover:shadow-[0_20px_50px_-15px_rgba(24,128,49,0.25)] hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      <span className="absolute left-0 top-6 bottom-6 w-1 bg-gradient-to-b from-primary to-emerald-400 rounded-r-full opacity-70 group-hover:opacity-100 group-hover:top-0 group-hover:bottom-0 transition-all duration-300" />

      <span className="pointer-events-none absolute -top-12 -right-12 w-32 h-32 rounded-full bg-primary/5 group-hover:bg-primary/10 blur-2xl transition-colors duration-500" />

      <div className="relative flex items-start justify-between mb-6">
        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center shadow-lg shadow-primary/30 ring-4 ring-primary/10 group-hover:scale-105 group-hover:rotate-3 transition-transform duration-300">
          {icon}
        </div>
        <div className="text-gray-300 group-hover:text-primary group-hover:translate-x-1 group-hover:-translate-y-1 transition-all duration-300 mt-1">
          <ArrowRight size={20} className="-rotate-45" />
        </div>
      </div>
      <h4 className="relative text-[10px] font-extrabold text-primary/70 uppercase tracking-[0.2em] mb-2 flex items-center">
        <span className="w-4 h-px bg-primary/40 mr-2" />
        {title}
      </h4>
      <p className="relative text-2xl xl:text-[1.7rem] font-black text-gray-900 mb-2 group-hover:text-primary transition-colors duration-300 tracking-tight truncate">
        {value}
      </p>
      <div className="relative mt-auto pt-6 border-t border-dashed border-gray-200 group-hover:border-primary/30 transition-colors duration-300">
        <p className="text-sm font-medium text-gray-500">{desc}</p>
      </div>
    </a>
  );
}
