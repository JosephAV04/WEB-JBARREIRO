export default function StatItem({ value, label }: { value: string; label: string }) {
  return (
    <div className="group p-6 rounded-3xl hover:bg-white/5 transition-colors">
      <p className="text-6xl md:text-7xl font-black mb-2 text-white drop-shadow-xl tracking-tighter">{value}</p>
      <p className="text-white font-bold uppercase tracking-[0.2em] text-xs md:text-sm opacity-90">{label}</p>
    </div>
  );
}
