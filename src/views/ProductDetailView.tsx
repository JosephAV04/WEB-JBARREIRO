import { useNavigate, useParams } from 'react-router-dom';
import { motion } from 'motion/react';
import { Pill, ArrowLeft, ShieldCheck } from 'lucide-react';
import { Helmet } from 'react-helmet-async';
import { productsData, getCloudinaryUrl } from '../data/products';

export default function ProductDetailView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = productsData.find(p => p.id === id);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <Helmet>
          <title>Producto no encontrado | JBARREIRO</title>
        </Helmet>
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Producto no encontrado</h2>
        <p className="text-gray-500 mb-8">El producto que buscas no existe o ha sido retirado.</p>
        <button
          onClick={() => navigate('/productos')}
          className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-primary hover:bg-primary-dark transition-colors"
        >
          <ArrowLeft className="mr-2" size={20} />
          Volver al catálogo
        </button>
      </div>
    );
  }

  const getProductPresentation = (name: string) => {
    const match = name.match(/^(.*?)\s+(X\d+.*|OFERTA.*|\(?\d+X\d+\)?.*)$/i);
    if (match) {
      return {
        baseName: match[1].trim(),
        presentation: match[2].trim().toUpperCase(),
      };
    }
    return {
      baseName: name,
      presentation: null,
    };
  };

  const activeIngredient = product.activeIngredient;
  const detailDescription = product.description;

  const { baseName, presentation } = getProductPresentation(product.name);
  const isSuspension = product.id === 'hematocri-suspension' || product.id.startsWith('taldro-fast');
  const metaDescription = `${product.name} - ${product.activeIngredient}. ${product.description} ${product.drugClass}. Distribuidora farmacéutica JBARREIRO en República Dominicana.`;
  const metaKeywords = [
    product.name,
    baseName,
    product.activeIngredient,
    product.drugClass,
    'medicamentos',
    'farmacia',
    'República Dominicana',
    'JBARREIRO',
  ].join(', ');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
    >
      <Helmet>
        <title>{`${baseName} (${product.activeIngredient}) | ${product.name} | JBARREIRO`}</title>
        <meta name="description" content={metaDescription} />
        <meta name="keywords" content={metaKeywords} />
        <link rel="canonical" href={`https://jbarreiro.com.do/productos/${product.id}`} />

        <meta property="og:title" content={`${product.name} - ${product.activeIngredient} | JBARREIRO`} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:image" content={getCloudinaryUrl(product.id)} />
        <meta property="og:url" content={`https://jbarreiro.com.do/productos/${product.id}`} />
        <meta property="og:type" content="product" />

        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Drug",
            "name": product.name,
            "alternateName": baseName,
            "activeIngredient": product.activeIngredient,
            "nonProprietaryName": product.activeIngredient,
            "drugClass": {
              "@type": "DrugClass",
              "name": product.drugClass
            },
            "description": `${product.activeIngredient}. ${product.description}`,
            "image": getCloudinaryUrl(product.id),
            "manufacturer": {
              "@type": "Organization",
              "name": "JBARREIRO & CO",
              "url": "https://jbarreiro.com.do"
            },
            "url": `https://jbarreiro.com.do/productos/${product.id}`,
            "offers": {
              "@type": "Offer",
              "price": product.price.replace(/[$,]/g, ''),
              "priceCurrency": "DOP",
              "availability": "https://schema.org/InStock",
              "url": `https://jbarreiro.com.do/productos/${product.id}`,
              "seller": {
                "@type": "Organization",
                "name": "JBARREIRO & CO"
              }
            }
          })}
        </script>
      </Helmet>

      <button
        onClick={() => navigate('/productos')}
        className="inline-flex items-center text-gray-500 hover:text-primary mb-8 transition-colors font-medium bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm"
      >
        <ArrowLeft className="mr-2" size={18} />
        Volver a productos
      </button>

      <div className="bg-white rounded-[2rem] md:rounded-[3rem] shadow-xl border border-gray-100 overflow-hidden">
        <div className="grid grid-cols-1 md:grid-cols-2">

          <div className="bg-gray-50/50 h-96 md:h-auto flex items-center justify-center border-b md:border-b-0 md:border-r border-gray-100 p-12 relative overflow-hidden">
            <img
              src={getCloudinaryUrl(product.id)}
              alt={baseName}
              className="max-h-full max-w-full object-contain relative z-10 transition-transform duration-500 hover:scale-105 mix-blend-multiply"
              onError={(e) => { e.currentTarget.style.display = 'none'; }}
            />
            <Pill size={120} className="text-gray-200 absolute z-0 opacity-40" />
          </div>

          <div className="p-8 md:p-12 lg:p-16 flex flex-col justify-center">

            <div className="mb-6 flex flex-wrap gap-3">
              <span className={`inline-flex items-center px-4 py-1.5 rounded-lg text-xs font-bold uppercase tracking-widest border ${
                isSuspension ? 'bg-orange-50 text-orange-600 border-orange-100' : 'bg-primary/10 text-primary border-primary/20'
              }`}>
                {isSuspension ? 'Suspensión Oral' : 'Comprimidos'}
              </span>
            </div>

            <div className="mb-6">
              <h1 className="text-4xl sm:text-5xl font-extrabold text-gray-900 tracking-tight leading-tight inline-block mr-3">
                {baseName}
              </h1>
              {presentation && (
                <span className="inline-block text-2xl sm:text-3xl font-black text-gray-400 align-text-bottom pb-1">
                  {presentation}
                </span>
              )}
            </div>

            <div className="relative pl-6 py-2 mb-8">
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-primary rounded-full"></div>
              <p className="text-xs font-bold text-gray-400 uppercase tracking-[0.2em] mb-1">Principio Activo</p>
              <p className="text-xl font-bold text-gray-800">{activeIngredient}</p>
              <p className="text-sm text-gray-500 mt-1">{product.drugClass}</p>
            </div>

            <p className="text-lg text-gray-600 mb-10 leading-relaxed font-light">
              {detailDescription || "Medicamento de alta calidad distribuido por JBARREIRO."}
            </p>

            <div className="mt-auto pt-8 border-t border-gray-100">
              <button
                onClick={() => navigate('/contacto')}
                className="w-full flex items-center justify-center px-8 py-5 border border-transparent text-xl font-bold rounded-2xl text-white bg-primary hover:bg-primary-dark transition-all shadow-[0_8px_20px_-6px_rgba(27,166,75,0.4)] transform hover:-translate-y-1"
              >
                Contactar para cotizar
              </button>
              <p className="text-center text-sm text-gray-400 mt-5 flex items-center justify-center">
                <ShieldCheck size={16} className="mr-2 text-primary" /> Venta exclusiva a establecimientos autorizados.
              </p>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
