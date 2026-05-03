import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { Pill, ArrowRight, ShieldCheck } from 'lucide-react';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export default function ParallaxCTA() {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();
  const enableFx = isDesktop && !reduceMotion;

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] });
  const yLayer1 = useTransform(scrollYProgress, [0, 1], ['-20%', '20%']);
  const yLayer2 = useTransform(scrollYProgress, [0, 1], ['20%', '-20%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 1.02]);

  return (
    <section
      ref={ref}
      className="relative py-32 md:py-48 overflow-hidden bg-[#0B1C10]"
    >
      <motion.div
        style={enableFx ? { y: yLayer1 } : undefined}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <div className="absolute top-[10%] left-[5%] text-primary/15 blur-sm">
          <Pill size={120} />
        </div>
        <div className="absolute top-[60%] left-[15%] text-emerald-400/10 blur-sm">
          <Pill size={80} />
        </div>
        <div className="absolute bottom-[10%] right-[20%] text-primary/10 blur-sm rotate-45">
          <Pill size={100} />
        </div>
      </motion.div>

      <motion.div
        style={enableFx ? { y: yLayer2 } : undefined}
        className="absolute inset-0 pointer-events-none hidden md:block"
      >
        <div className="absolute top-[20%] right-[10%] text-emerald-400/10">
          <Pill size={140} />
        </div>
        <div className="absolute bottom-[20%] left-[40%] text-primary/15 rotate-12">
          <Pill size={90} />
        </div>
      </motion.div>

      <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-transparent to-emerald-500/20 pointer-events-none"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(32,167,64,0.25),transparent_70%)] pointer-events-none"></div>

      <motion.div
        style={enableFx ? { scale } : undefined}
        className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 md:backdrop-blur border border-white/20 text-emerald-300 font-bold text-xs uppercase tracking-[0.3em] mb-8">
            <ShieldCheck size={14} /> Listos para atenderte
          </span>

          <h2 className="text-4xl md:text-6xl xl:text-7xl font-black text-white tracking-tighter leading-[0.95] mb-8">
            Hablemos del <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-300 via-primary-light to-emerald-200">
              próximo paso
            </span>
            <br />
            <span className="text-white/90">de tu farmacia.</span>
          </h2>

          <p className="text-lg md:text-2xl text-white/70 max-w-2xl mx-auto mb-12 font-light leading-relaxed">
            Nuestro equipo de ventas responde en menos de una hora. Cotización personalizada, entrega rápida.
          </p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <button
              onClick={() => navigate('/contacto')}
              className="px-10 py-5 bg-white text-primary-dark font-black rounded-full hover:bg-emerald-50 transition-all shadow-2xl flex items-center justify-center group text-lg transform hover:-translate-y-1"
            >
              Habla con un asesor
              <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={22} />
            </button>
            <a
              href="https://wa.me/18099092606"
              target="_blank"
              rel="noopener noreferrer"
              className="px-10 py-5 bg-white/10 md:backdrop-blur text-white border border-white/20 font-bold rounded-full hover:bg-white/15 transition-all flex items-center justify-center text-lg"
            >
              WhatsApp directo
            </a>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
