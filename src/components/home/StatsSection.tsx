import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Pill, ShieldCheck } from 'lucide-react';
import AnimatedCounter from '../motion/AnimatedCounter';
import { useIsDesktop } from '../../hooks/useIsDesktop';

const stats = [
  { value: 10, suffix: '+', label: 'Años de experiencia' },
  { value: 50, suffix: '+', label: 'Farmacias aliadas' },
  { value: 100, suffix: '%', label: 'Calidad certificada' },
  { value: 24, suffix: 'h', label: 'Logística de precisión' },
];

export default function StatsSection() {
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const enableFx = isDesktop && !reduceMotion;
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yPills = useTransform(scrollYProgress, [0, 1], ['-30%', '30%']);

  return (
    <section
      ref={ref}
      className="relative py-28 md:py-40 bg-gradient-to-br from-primary-dark via-primary to-emerald-600 text-white overflow-hidden"
    >
      <motion.div
        style={enableFx ? { y: yPills } : undefined}
        className="absolute inset-0 pointer-events-none"
      >
        <div className="absolute top-10 left-[5%] text-white/10 hidden md:block">
          <Pill size={80} />
        </div>
        <div className="absolute bottom-10 right-[8%] text-white/10 hidden md:block">
          <ShieldCheck size={100} />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-white/[0.04]">
          <Pill size={400} />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.1),transparent_50%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(255,255,255,0.08),transparent_50%)] pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="text-center mb-16"
        >
          <span className="text-emerald-200 font-bold text-sm uppercase tracking-[0.3em] mb-3 block">
            Números que respaldan
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black tracking-tight">
            Confianza construida con datos
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-12 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="group p-6 md:p-8 rounded-3xl hover:bg-white/5 transition-colors"
            >
              <p className="text-5xl sm:text-6xl md:text-7xl xl:text-8xl font-black mb-3 text-white drop-shadow-2xl tracking-tighter leading-none">
                <AnimatedCounter to={s.value} suffix={s.suffix} duration={2} />
              </p>
              <p className="text-white/90 font-bold uppercase tracking-[0.2em] text-[10px] md:text-xs">
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
