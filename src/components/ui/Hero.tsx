import { motion, AnimatePresence } from 'motion/react';
import { SceneContainer } from '../3d/SceneContainer';
import { FloatingItem } from '../3d/Experience';
import { ArrowRight, Clock, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';

export const Hero = () => {
  const { t } = useLanguage();
  const { currentAddress, serviceability } = useLocation();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      <SceneContainer cameraPos={[0, 0, 10]}>
        <FloatingItem color="#ff4b4b" position={[-4, 2, 0]} speed={1.2} />
        <FloatingItem color="#00f2ff" position={[4, -2, 2]} speed={0.8} />
        <FloatingItem color="#ffcc00" position={[3, 3, -2]} speed={1.5} />
        <FloatingItem color="#7000ff" position={[-3, -3, 1]} speed={1} />
        <FloatingItem color="#ffffff" position={[0, 0, -5]} speed={0.5} />
      </SceneContainer>

      <div className="relative z-20 text-center max-w-4xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center gap-4 mb-6"
        >
          <span className="px-4 py-1.5 rounded-full border border-brand-primary/30 bg-brand-primary/10 text-brand-primary font-bold text-sm tracking-widest uppercase flex items-center gap-2">
            <Clock size={16} /> {t('hero.tagline')}
          </span>
          
          <AnimatePresence>
            {currentAddress && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg text-[10px] font-black text-slate-400 uppercase tracking-widest"
              >
                <div className="w-1.5 h-1.5 bg-brand-primary rounded-full animate-pulse shadow-[0_0_8px_#00f2ff]" />
                Deliver in {serviceability.eta} to <span className="text-white">{currentAddress.area || currentAddress.city}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl sm:text-6xl md:text-8xl font-extrabold tracking-tighter mb-6 sm:mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-500"
        >
          {t('hero.title')}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-lg sm:text-xl text-gray-400 mb-8 sm:mb-10 max-w-2xl mx-auto"
        >
          {t('hero.subtitle')}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6"
        >
          <a 
            href="#shop" 
            onClick={(e) => scrollToSection(e, 'shop')}
            className="w-full sm:w-auto group relative px-8 py-4 bg-brand-primary text-gray-950 font-bold rounded-2xl overflow-hidden hover:scale-105 transition-transform active:scale-95 no-underline flex items-center justify-center"
          >
            <span className="relative z-10 flex items-center gap-2">
              {t('hero.cta')} <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity" />
          </a>
          
          <a 
            href="#track" 
            onClick={(e) => scrollToSection(e, 'track')}
            className="w-full sm:w-auto px-8 py-4 glass border-white/10 text-white font-bold rounded-2xl hover:bg-white/5 transition-colors no-underline flex items-center justify-center"
          >
            {t('hero.tracking')}
          </a>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-8"
        >
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Zap className="text-brand-primary" size={20} /> Hyper-local Micro-warehouses
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <ShieldCheck className="text-brand-primary" size={20} /> 100% Contactless Secure
          </div>
          <div className="flex items-center gap-3 text-sm text-gray-400">
            <Clock className="text-brand-primary" size={20} /> Live GPS Smart ETA
          </div>
        </motion.div>
      </div>
      
      {/* Visual noise/gradient at bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-background to-transparent z-10 pointer-events-none" />
    </section>
  );
};
