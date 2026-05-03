import { motion, useReducedMotion } from 'motion/react';
import MarqueeText from '../shared/MarqueeText';
import ChainLogo from '../shared/ChainLogo';
import RevealOnScroll from '../motion/RevealOnScroll';

export default function BrandsMarquee() {
  const reduceMotion = useReducedMotion();

  return (
    <>
      <div className="bg-primary py-6 overflow-hidden flex whitespace-nowrap relative">
        <div className="absolute inset-0 bg-gradient-to-b from-primary-dark/20 to-transparent pointer-events-none"></div>
        <motion.div
          className="flex shrink-0 items-center gap-8 px-4"
          animate={reduceMotion ? undefined : { x: ['0%', '-100%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          <MarqueeText />
        </motion.div>
        <motion.div
          className="flex shrink-0 items-center gap-8 px-4"
          animate={reduceMotion ? undefined : { x: ['0%', '-100%'] }}
          transition={{ duration: 25, ease: 'linear', repeat: Infinity }}
        >
          <MarqueeText />
        </motion.div>
      </div>

      <section className="py-24 md:py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <RevealOnScroll className="text-center mb-16">
            <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-3 block">
              Respaldados por los mejores
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight">
              Alianzas <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">Estratégicas</span>
            </h2>
            <p className="mt-5 text-lg text-gray-500 max-w-2xl mx-auto">
              Nuestros productos están presentes en las redes farmacéuticas más importantes y prestigiosas del país.
            </p>
          </RevealOnScroll>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12 items-center justify-items-center">
            {['Farmacia Carol', 'GBC', 'Farmacia Los Hidalgos', 'FarmaValue'].map((name, i) => (
              <RevealOnScroll key={name} direction="scale" delay={i * 0.1} duration={0.6} className="w-full">
                <ChainLogo name={name} />
              </RevealOnScroll>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
