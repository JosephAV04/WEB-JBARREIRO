import React from 'react';

export default function FeatureCard({ icon, title, desc }: { icon: React.ReactNode; title: string; desc: string }) {
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
