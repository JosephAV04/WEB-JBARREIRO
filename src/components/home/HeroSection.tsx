import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, useScroll, useTransform, useReducedMotion } from 'motion/react';
import { ArrowRight, ShieldCheck, MapPin, Pill, ChevronDown, Sparkles } from 'lucide-react';
import frenteImg from '../../assets/Frente JBARREIRO.jpg';
import { useIsDesktop } from '../../hooks/useIsDesktop';

export default function HeroSection() {
  const navigate = useNavigate();
  const ref = useRef<HTMLElement>(null);
  const reduceMotion = useReducedMotion();
  const isDesktop = useIsDesktop();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const yBg = useTransform(scrollYProgress, [0, 1], ['0%', '40%']);
  const yImg = useTransform(scrollYProgress, [0, 1], ['0%', '15%']);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);
  const scaleContent = useTransform(scrollYProgress, [0, 1], [1, 0.95]);

  const enableScrollFx = isDesktop && !reduceMotion;
  const enableHeavyFx = isDesktop && !reduceMotion;

  return (
    <section
      ref={ref}
      className="relative min-h-[100svh] flex items-center overflow-hidden bg-gradient-to-b from-white via-emerald-50/30 to-white"
    >
      <motion.div
        style={enableScrollFx ? { y: yBg } : undefined}
        className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      >
        {enableHeavyFx ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
              className="absolute -top-[40%] -right-[20%] w-[90vw] h-[90vw] rounded-full bg-gradient-to-br from-primary/25 via-emerald-400/10 to-transparent blur-[140px]"
            />
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 80, repeat: Infinity, ease: 'linear' }}
              className="absolute -bottom-[30%] -left-[20%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-tr from-emerald-300/25 via-primary/10 to-transparent blur-[120px]"
            />
          </>
        ) : (
          <>
            <div className="absolute -top-[20%] -right-[10%] w-[70vw] h-[70vw] rounded-full bg-gradient-to-br from-primary/20 to-transparent blur-[60px]" />
            <div className="absolute -bottom-[15%] -left-[10%] w-[60vw] h-[60vw] rounded-full bg-gradient-to-tr from-emerald-300/20 to-transparent blur-[60px]" />
          </>
        )}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(0,0,0,0.06)_1px,transparent_0)] [background-size:32px_32px] opacity-40 hidden md:block"></div>
      </motion.div>

      <motion.div
        style={enableScrollFx ? { opacity, scale: scaleContent } : undefined}
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-12 pb-20 lg:pt-8 lg:pb-28 w-full"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 xl:gap-14 items-center">

          <div className="lg:col-span-6 relative z-20">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-white md:bg-white/80 md:backdrop-blur-md text-primary font-bold text-xs sm:text-sm uppercase tracking-widest mb-6 border border-primary/20 shadow-sm"
            >
              <span className="relative flex h-2.5 w-2.5 mr-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-60"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary"></span>
              </span>
              Distribuidora · República Dominicana
            </motion.div>

            <h1 className="text-[clamp(2.75rem,8vw,6rem)] font-black text-gray-900 leading-[0.95] mb-8 tracking-[-0.04em]">
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                Elevemos la
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.25, ease: [0.16, 1, 0.3, 1] }}
                className="block bg-gradient-to-r from-primary via-emerald-500 to-primary bg-clip-text text-transparent animate-gradient-sweep"
              >
                Salud
              </motion.span>
              <motion.span
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="block"
              >
                en cada dosis.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.55 }}
              className="text-lg md:text-xl xl:text-2xl text-gray-600 leading-relaxed mb-10 max-w-xl font-medium"
            >
              Abastecemos a las principales cadenas de farmacias con medicamentos de la más alta calidad y eficacia comprobada.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.7 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => navigate('/productos')}
                className="px-8 py-4 bg-primary text-white font-bold rounded-full hover:bg-primary-dark transition-all shadow-glow-primary hover:shadow-glow-primary-lg flex items-center justify-center group text-lg transform hover:-translate-y-1 active:translate-y-0"
              >
                Explorar Catálogo
                <ArrowRight className="ml-3 group-hover:translate-x-2 transition-transform" size={22} />
              </button>
              <button
                onClick={() => navigate('/contacto')}
                className="px-8 py-4 bg-white md:bg-white/80 md:backdrop-blur text-gray-900 border-2 border-gray-200 font-bold rounded-full hover:border-primary/40 hover:bg-white transition-all flex items-center justify-center text-lg"
              >
                Contactar Ventas
              </button>
            </motion.div>
          </div>

          <div className="lg:col-span-6 relative">
            <motion.div
              style={enableScrollFx ? { y: yImg } : undefined}
              className="relative"
            >
              <motion.div
                initial={{ opacity: 0, scale: 1.05, clipPath: 'inset(0 100% 0 0)' }}
                animate={{ opacity: 1, scale: 1, clipPath: 'inset(0 0% 0 0)' }}
                transition={{ duration: 1.4, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative rounded-[2rem] md:rounded-[2.5rem] overflow-hidden shadow-[0_40px_80px_-20px_rgba(0,0,0,0.3)] border-4 md:border-[6px] border-white aspect-[5/4] md:aspect-[16/11]"
              >
                <img
                  src={frenteImg}
                  alt="Sede de JBARREIRO & CO en República Dominicana"
                  className="w-full h-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/40 via-transparent to-emerald-200/10 mix-blend-multiply"></div>
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"></div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: 1.6 }}
                  className="absolute bottom-0 left-0 right-0 p-5 md:p-7"
                >
                  <div className="bg-black/30 md:bg-white/15 md:backdrop-blur-xl px-5 py-4 rounded-2xl border border-white/25 inline-flex items-center gap-3">
                    <MapPin size={18} className="text-emerald-200 shrink-0" />
                    <div className="text-left">
                      <p className="text-[10px] font-bold text-emerald-200 uppercase tracking-[0.2em]">Sede Central</p>
                      <p className="text-white font-bold text-sm md:text-base">Santo Domingo, RD</p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: 30, y: -30 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -top-6 -right-3 md:-top-8 md:-right-8 z-30"
              >
                <motion.div
                  animate={enableHeavyFx ? { y: [0, -10, 0], rotate: [-2, 2, -2] } : undefined}
                  transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
                  className="bg-white px-4 py-3 md:px-5 md:py-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-primary to-emerald-500 rounded-xl flex items-center justify-center text-white shadow-glow-primary">
                    <ShieldCheck size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Certificado</p>
                    <p className="text-sm md:text-base font-black text-gray-900 leading-tight">100% Sanitario</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scale: 0.6, x: -30, y: 30 }}
                animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
                transition={{ duration: 0.7, delay: 2.0, ease: [0.16, 1, 0.3, 1] }}
                className="absolute -bottom-5 -left-3 md:-bottom-8 md:-left-8 z-30"
              >
                <motion.div
                  animate={enableHeavyFx ? { y: [0, 10, 0], rotate: [2, -2, 2] } : undefined}
                  transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
                  className="bg-white px-4 py-3 md:px-5 md:py-4 rounded-2xl shadow-2xl border border-gray-100 flex items-center gap-3"
                >
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br from-emerald-400 to-primary rounded-xl flex items-center justify-center text-white">
                    <Sparkles size={20} />
                  </div>
                  <div>
                    <p className="text-[9px] md:text-[10px] font-bold text-gray-400 uppercase tracking-wider">Trayectoria</p>
                    <p className="text-sm md:text-base font-black text-gray-900 leading-tight">+10 años</p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [-15, 15, -15], rotate: [0, 25, 0] }}
                transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute -top-10 left-1/3 z-10 text-primary/30 hidden md:block pointer-events-none"
              >
                <Pill size={50} />
              </motion.div>

              <motion.div
                animate={reduceMotion ? undefined : { y: [15, -15, 15], rotate: [45, 0, 45] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
                className="absolute -bottom-2 right-1/4 z-10 text-emerald-400/40 hidden md:block pointer-events-none"
              >
                <Pill size={36} />
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.8 }}
                className="absolute -inset-4 md:-inset-6 -z-10 rounded-[3rem] bg-gradient-to-br from-primary/20 via-emerald-300/10 to-transparent blur-2xl"
              ></motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-16 lg:mt-20 flex flex-wrap gap-x-8 gap-y-3 text-sm text-gray-500 justify-center lg:justify-start"
        >
          <div className="flex items-center gap-2"><ShieldCheck size={16} className="text-primary" /> 100% certificado</div>
          <div className="flex items-center gap-2"><Sparkles size={16} className="text-primary" /> Calidad farmacéutica</div>
          <div className="flex items-center gap-2"><Pill size={16} className="text-primary" /> +25 medicamentos</div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 1 }}
        style={enableScrollFx ? { opacity } : undefined}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 hidden md:flex flex-col items-center gap-2 text-gray-400"
      >
        <span className="text-[10px] font-bold uppercase tracking-[0.3em]">Scroll</span>
        <motion.div
          animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} />
        </motion.div>
      </motion.div>
    </section>
  );
}
