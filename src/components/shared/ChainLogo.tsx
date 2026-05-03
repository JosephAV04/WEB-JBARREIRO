import { motion } from 'motion/react';
import logoCarol from '../../assets/LogoCarol.png';
import logoGBC from '../../assets/LogoGBC.png';
import logoHidalgos from '../../assets/LogoHidalgos.png';
import logoValue from '../../assets/LogoValue.png';

export default function ChainLogo({ name }: { name: string }) {
  const getLogo = (name: string) => {
    switch (name) {
      case 'Farmacia Carol': return logoCarol;
      case 'GBC': return logoGBC;
      case 'Farmacia Los Hidalgos': return logoHidalgos;
      case 'FarmaValue': return logoValue;
      default: return null;
    }
  };

  const logoUrl = getLogo(name);

  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="w-full flex justify-center cursor-pointer group"
    >
      <div className="w-full max-w-[200px] h-28 flex items-center justify-center p-4 transition-all duration-300">
        {logoUrl ? (
          <img
            src={logoUrl}
            alt={name}
            className="max-h-full max-w-full object-contain transition-transform duration-500 mix-blend-multiply"
          />
        ) : (
          <span className="font-bold text-gray-400 group-hover:text-primary transition-colors text-center">{name}</span>
        )}
      </div>
    </motion.div>
  );
}
