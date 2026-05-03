import { motion } from 'motion/react';
import { Pill, Phone, Mail, MapPin, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import ContactCard from '../components/shared/ContactCard';

export default function ContactView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full bg-[#f8fafc] min-h-screen pb-24 relative overflow-hidden"
    >
      <div className="relative pt-12 pb-24 md:pt-16 md:pb-32 overflow-hidden bg-white border-b border-gray-100 shadow-sm z-10">

        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none opacity-60">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[100vw] md:w-[800px] h-[60vw] md:h-[400px] bg-gradient-to-b from-primary/10 to-transparent rounded-full blur-[80px]"></div>
          <div className="absolute bottom-0 right-0 w-[50vw] md:w-[400px] h-[50vw] md:h-[400px] bg-emerald-400/10 rounded-full blur-[100px] transform translate-y-1/2 translate-x-1/4"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMCwgMCwgMCwgMC4wNSkiLz48L3N2Zz4=')] opacity-50"></div>
        </div>

        <motion.div
          animate={{ y: [-15, 15, -15], rotate: [0, 15, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] right-[10%] text-primary/10 blur-[1px] hidden md:block"
        >
          <Pill size={100} />
        </motion.div>
        <motion.div
          animate={{ y: [15, -15, 15], rotate: [0, -15, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[10%] left-[10%] text-emerald-500/10 blur-[2px] hidden md:block"
        >
          <ShieldCheck size={120} />
        </motion.div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center mt-6 md:mt-0">

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center px-4 py-2 rounded-full bg-white shadow-sm border border-gray-100 mb-6 md:mb-8"
          >
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-500 mr-3 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            </span>
            <span className="text-gray-500 font-bold text-xs uppercase tracking-[0.15em]">Equipo de ventas en línea</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-[5rem] font-black text-gray-900 tracking-tighter leading-[1.1] mb-6"
          >
            Hablemos de <br className="md:hidden" />
            <span className="relative inline-block mt-2 md:mt-0">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-emerald-400 pr-2">
                Negocios
              </span>
              <svg className="absolute w-full h-3 -bottom-1 md:-bottom-2 left-0 text-emerald-300/40 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="6" fill="transparent" strokeLinecap="round" />
              </svg>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-500 font-medium leading-relaxed"
          >
            Tu farmacia merece <strong className="text-gray-900 font-extrabold">calidad y abastecimiento continuo</strong>. Nuestro equipo está listo para ayudarte a crecer.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-12 md:-mt-16 relative z-20">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-24">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="h-full">
            <ContactCard
              icon={<Phone className="text-white" size={24} strokeWidth={2.5} />}
              title="Línea Principal"
              value="809 980 8810"
              desc="Lunes a Viernes, 8:00 AM - 5:00 PM"
              href="tel:8099808810"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="h-full">
            <ContactCard
              icon={
                <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className="text-white">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              }
              title="Ventas Directas"
              value="809 909 2606"
              desc="Respuesta rápida en < 1 hora"
              href="https://wa.me/18099092606"
            />
          </motion.div>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="h-full">
            <ContactCard
              icon={<Mail className="text-white" size={24} strokeWidth={2.5} />}
              title="Email Corporativo"
              value="jbarreiro.co@gmail.com"
              desc="Cotizaciones y logística"
              href="mailto:jbarreiro.co@gmail.com"
            />
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12"
        >
          <div className="lg:col-span-5 flex flex-col justify-center pt-4">
            <h3 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-8 tracking-tight">Nuestra Sede</h3>

            <div className="space-y-6">
              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden flex items-start">
                <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary"></div>
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0">
                  <MapPin className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-gray-900 mb-2">Dirección Principal</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Manzana 8 No. 19, Ciudad Colosal<br/>
                    Santo Domingo, República Dominicana
                  </p>
                </div>
              </div>

              <div className="bg-white p-6 md:p-8 rounded-[2rem] shadow-sm border border-gray-100 relative overflow-hidden flex items-start">
                <div className="w-12 h-12 bg-gray-50 border border-gray-100 rounded-2xl flex items-center justify-center mr-5 flex-shrink-0">
                  <ShieldCheck className="text-primary" size={24} />
                </div>
                <div>
                  <p className="font-extrabold text-lg text-gray-900 mb-2">Distribución Nacional</p>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    Nuestra red logística cubre todo el territorio nacional, garantizando disponibilidad en las principales cadenas de farmacias.
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 h-[400px] md:h-[500px] bg-gray-100 rounded-[2.5rem] overflow-hidden shadow-inner relative border border-gray-200">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3783.455049393656!2d-69.7896493!3d18.508327599999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8eaf87f41177423f%3A0xa20e45aa0ee936b0!2sJBARREIRO%20%26%20CO.%20S.R.L!5e0!3m2!1ses-419!2sdo!4v1772326455098!5m2!1ses-419!2sdo"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={false}
            />
          </div>
        </motion.div>
      </div>

      <Helmet>
        <title>Contacto | JBARREIRO & CO</title>
        <meta name="description" content="Contacta a JBARREIRO & CO para cotización y distribución mayorista de medicamentos en República Dominicana." />
        <link rel="canonical" href="https://jbarreiro.com.do/contacto" />
        <meta property="og:title" content="Contacto | JBARREIRO & CO" />
        <meta property="og:url" content="https://jbarreiro.com.do/contacto" />
        <meta property="og:type" content="website" />
      </Helmet>
    </motion.div>
  );
}
