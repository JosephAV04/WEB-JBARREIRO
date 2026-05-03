import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { useRef } from 'react';
import { ShieldCheck, Truck, Clock, ArrowUpRight } from 'lucide-react';
import RevealOnScroll from '../motion/RevealOnScroll';

const features = [
  {
    n: '01',
    icon: <ShieldCheck size={32} />,
    eyebrow: 'Calidad',
    title: 'Garantía sanitaria certificada',
    desc: 'Todos nuestros medicamentos cumplen con las más estrictas normativas y controles de calidad nacionales e internacionales.',
    accent: 'from-primary to-emerald-500',
  },
  {
    n: '02',
    icon: <Truck size={32} />,
    eyebrow: 'Logística',
    title: 'Distribución a nivel nacional',
    desc: 'Sistema de entregas ágil y confiable con cobertura en todo el territorio dominicano para asegurar la disponibilidad continua.',
    accent: 'from-emerald-400 to-primary',
  },
  {
    n: '03',
    icon: <Clock size={32} />,
    eyebrow: 'Tiempos',
    title: 'Compromiso de 24 a 48 horas',
    desc: 'Velocidad de respuesta para que el abastecimiento de tu establecimiento nunca dependa del azar ni de la espera.',
    accent: 'from-primary-light to-emerald-500',
  },
];

export default function FeaturesSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yDecor = useTransform(scrollYProgress, [0, 1], ['-15%', '15%']);

  return (
    <section
      ref={ref}
      className="relative py-24 md:py-36 bg-[#0B1C10] text-white overflow-hidden"
    >
      <motion.div
        style={reduceMotion ? undefined : { y: yDecor }}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-0 left-1/3 w-[60vw] h-[60vw] rounded-full bg-primary/20 blur-[180px]"></div>
        <div className="absolute bottom-0 right-0 w-[50vw] h-[50vw] rounded-full bg-emerald-500/15 blur-[160px]"></div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(255,255,255,0.04)_1px,transparent_0)] [background-size:32px_32px] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll className="max-w-4xl mb-16 md:mb-24">
          <span className="inline-flex items-center gap-2 text-emerald-300 font-bold text-xs md:text-sm uppercase tracking-[0.3em] mb-5">
            <span className="w-8 h-px bg-emerald-300"></span> Por qué JBARREIRO
          </span>
          <h2 className="text-[clamp(2.5rem,7vw,5.5rem)] font-black tracking-[-0.03em] leading-[0.95]">
            <span className="block">Tu farmacia</span>
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-primary-light to-emerald-200">
              merece lo mejor.
            </span>
          </h2>
          <p className="mt-6 md:mt-8 text-lg md:text-xl text-white/60 max-w-2xl leading-relaxed font-light">
            Tres razones por las que las principales cadenas farmacéuticas del país nos eligen como socio estratégico.
          </p>
        </RevealOnScroll>

        <div className="space-y-4 md:space-y-6">
          {features.map((f, i) => (
            <motion.article
              key={f.n}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="group relative rounded-3xl md:rounded-[2rem] border border-white/10 bg-white/[0.03] backdrop-blur-sm hover:bg-white/[0.06] hover:border-primary/40 transition-colors duration-500 overflow-hidden"
            >
              <div className={`absolute left-0 top-0 bottom-0 w-1 md:w-1.5 bg-gradient-to-b ${f.accent} origin-top scale-y-0 group-hover:scale-y-100 transition-transform duration-700`}></div>

              <div className="absolute -right-10 -top-10 w-48 h-48 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"></div>

              <div className="relative p-6 md:p-10 lg:p-12 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-10 items-center">

                <div className="md:col-span-3 lg:col-span-3 flex items-center gap-4 md:gap-6">
                  <span
                    aria-hidden
                    className="text-[5rem] md:text-[7rem] lg:text-[9rem] font-black leading-none tracking-tighter text-transparent bg-clip-text"
                    style={{
                      WebkitTextStroke: '1.5px rgba(255,255,255,0.18)',
                    }}
                  >
                    {f.n}
                  </span>
                  <div className={`w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-gradient-to-br ${f.accent} text-white flex items-center justify-center shrink-0 shadow-glow-primary group-hover:scale-110 group-hover:-rotate-6 transition-transform duration-500`}>
                    {f.icon}
                  </div>
                </div>

                <div className="md:col-span-7 lg:col-span-7">
                  <p className="text-emerald-300 font-bold text-[10px] md:text-xs uppercase tracking-[0.3em] mb-3">
                    {f.eyebrow}
                  </p>
                  <h3 className="text-2xl md:text-3xl lg:text-4xl font-black text-white mb-3 md:mb-4 leading-tight tracking-tight">
                    {f.title}
                  </h3>
                  <p className="text-white/65 text-base md:text-lg leading-relaxed max-w-2xl">
                    {f.desc}
                  </p>
                </div>

                <div className="md:col-span-2 lg:col-span-2 flex md:justify-end">
                  <div className="w-12 h-12 md:w-14 md:h-14 rounded-full border border-white/15 group-hover:border-primary group-hover:bg-primary group-hover:rotate-45 flex items-center justify-center text-white/50 group-hover:text-white transition-all duration-500">
                    <ArrowUpRight size={20} />
                  </div>
                </div>

              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
