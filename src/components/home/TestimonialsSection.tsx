import { motion } from 'motion/react';
import { Quote } from 'lucide-react';
import RevealOnScroll from '../motion/RevealOnScroll';

const testimonials = [
  {
    quote: 'JBARREIRO se ha convertido en un aliado clave para mantener nuestro stock siempre disponible. Calidad y puntualidad sin excepciones.',
    author: 'Lic. María Fernández',
    role: 'Encargada de compras',
  },
  {
    quote: 'Su catálogo de comprimidos cubre exactamente lo que las cadenas demandan. Logística impecable y respuesta inmediata.',
    author: 'Dr. Rafael Morillo',
    role: 'Director de farmacia',
  },
  {
    quote: 'Trabajamos con ellos hace más de tres años. La consistencia en la calidad y el servicio postventa es de otra liga.',
    author: 'Sra. Patricia Núñez',
    role: 'Gerente regional',
  },
];

export default function TestimonialsSection() {
  return (
    <section className="py-24 md:py-32 bg-gradient-to-b from-gray-50/60 to-white relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <RevealOnScroll className="text-center mb-16 max-w-3xl mx-auto">
          <span className="text-primary font-bold text-sm uppercase tracking-[0.3em] mb-3 block">
            Confianza comprobada
          </span>
          <h2 className="text-4xl md:text-5xl xl:text-6xl font-black text-gray-900 tracking-tight leading-[1.05]">
            La voz de quienes <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400">nos eligen</span>
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <motion.figure
              key={t.author}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
              className="relative bg-white p-8 md:p-10 rounded-[2.5rem] border border-gray-100 hover:border-primary/30 hover:shadow-xl transition-all duration-500 group"
            >
              <Quote className="absolute top-6 right-6 text-primary/20 group-hover:text-primary/40 transition-colors" size={48} />

              <blockquote className="relative text-gray-700 text-lg leading-relaxed mb-8 font-medium">
                "{t.quote}"
              </blockquote>

              <figcaption className="relative flex items-center gap-4 pt-6 border-t border-gray-100">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-emerald-500 flex items-center justify-center text-white font-black text-lg shadow-lg">
                  {t.author.split(' ').slice(-2).map(s => s[0]).join('')}
                </div>
                <div>
                  <p className="font-black text-gray-900">{t.author}</p>
                  <p className="text-sm text-gray-500">{t.role}</p>
                </div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
