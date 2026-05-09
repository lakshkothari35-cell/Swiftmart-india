import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Navigation, Zap } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import { useLocation } from '../../context/LocationContext';

export const DeliverySection = () => {
  const { t } = useLanguage();
  const { currentAddress, serviceability } = useLocation();

  return (
    <section id="track" className="py-24 px-6 relative bg-background overflow-hidden transition-colors duration-500">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className="relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="w-12 h-12 bg-brand-secondary rounded-xl flex items-center justify-center mb-6 shadow-lg shadow-brand-secondary/20">
              <Navigation className="text-white" size={24} />
            </div>
            <h2 className="text-4xl md:text-6xl font-black mb-8 tracking-tighter text-white">
              {t('track.title')} <br />
              <span className="text-brand-primary">{t('track.subtitle')}</span>
            </h2>
            <p className="text-xl text-gray-400 mb-10 text-left">
              Our delivery network covers major urban hubs to ensure you never have to wait. Tracking is live, granular, and hyper-accurate.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start gap-6 p-6 glass rounded-2xl border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-full border-2 border-brand-primary flex items-center justify-center shrink-0">
                  <div className="w-2 h-2 bg-brand-primary rounded-full animate-ping" />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg mb-1 text-white">{serviceability.isAvailable ? 'Hub Active' : 'Service Pending'}</h4>
                  <p className="text-gray-500 text-sm">{currentAddress?.full_address || 'Detecting your nearest warehouse...'}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-6 p-6 glass rounded-2xl border-white/5 bg-white/[0.02]">
                <div className="w-10 h-10 rounded-full border-2 border-brand-secondary flex items-center justify-center shrink-0">
                  <Clock className="text-brand-secondary" size={20} />
                </div>
                <div className="text-left">
                  <h4 className="font-bold text-lg mb-1 text-white">{serviceability.eta} Delivery</h4>
                  <p className="text-gray-500 text-sm">{serviceability.message}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="relative h-[400px] sm:h-[600px] rounded-[30px] sm:rounded-[40px] overflow-hidden border border-white/10 shadow-2xl bg-slate-900 group">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15282225.79979123!2d72.99905700000002!3d21.125498!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30635c0661d941bb%3A0x9a562097071e679a!2sIndia!5e0!3m2!1sen!2sin!4v1715400000000!5m2!1sen!2sin"
            className="w-full h-full grayscale-[20%] contrast-[1.1] invert-[0.9] hue-rotate-[180deg]"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
          
          {/* Overlay UI for the Map */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start pointer-events-none">
            <div className="glass p-2 sm:p-4 rounded-xl sm:rounded-2xl px-4 sm:px-6 pointer-events-auto bg-gray-900/80 backdrop-blur-md">
              <div className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-500 mb-1">Coverage</div>
              <div className="text-lg sm:text-xl font-black text-brand-primary uppercase">Pan India</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
