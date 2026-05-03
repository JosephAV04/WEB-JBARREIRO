import { motion } from 'motion/react';
import HeroSection from '../components/home/HeroSection';
import BrandsMarquee from '../components/home/BrandsMarquee';
import FeaturedProducts from '../components/home/FeaturedProducts';
import StatsSection from '../components/home/StatsSection';
import FeaturesSection from '../components/home/FeaturesSection';
import ParallaxCTA from '../components/home/ParallaxCTA';
import TestimonialsSection from '../components/home/TestimonialsSection';

export default function HomeView() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="w-full bg-white"
    >
      <HeroSection />
      <BrandsMarquee />
      <FeaturedProducts />
      <StatsSection />
      <FeaturesSection />
      <ParallaxCTA />
      <TestimonialsSection />
    </motion.div>
  );
}
