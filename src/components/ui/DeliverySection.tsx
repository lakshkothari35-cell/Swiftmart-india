import { motion, AnimatePresence } from 'motion/react';
import { Clock, MapPin, Navigation, Zap, Globe } from 'lucide-react';
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
          {/* Visual Map Placeholder */}
          <div className="absolute inset-0 opacity-20 pointer-events-none">
            <div className="absolute inset-0" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0)', backgroundSize: '40px 40px' }} />
            <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-brand-primary/20 rounded-full blur-[100px] animate-pulse" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-brand-secondary/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
          </div>

          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative">
                <motion.div 
                    animate={{ rotate: 360 }}
                    transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                    className="w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] rounded-full border border-white/5 flex items-center justify-center"
                >
                    <div className="w-[80%] h-[80%] rounded-full border border-white/10 flex items-center justify-center">
                        <div className="w-[60%] h-[60%] rounded-full border border-brand-primary/20 flex items-center justify-center">
                            <Globe className="text-brand-primary/20 w-12 h-12" />
                        </div>
                    </div>
                </motion.div>
                
                {/* Simulated Nodes */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                    {[...Array(6)].map((_, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, scale: 0 }}
                            animate={{ opacity: [0.2, 0.5, 0.2], scale: [1, 1.2, 1] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
                            className="absolute w-2 h-2 bg-brand-primary rounded-full shadow-[0_0_10px_#00f2ff]"
                            style={{
                                top: `${20 + Math.random() * 60}%`,
                                left: `${20 + Math.random() * 60}%`
                            }}
                        />
                    ))}
                    
                    {currentAddress && (
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
                            <div className="relative">
                                <div className="w-4 h-4 bg-white rounded-full animate-ping absolute -inset-0" />
                                <div className="w-4 h-4 bg-brand-primary rounded-full border-2 border-white shadow-xl relative z-10" />
                                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap glass px-3 py-1 rounded-lg text-[10px] font-bold text-white border border-white/10 uppercase tracking-widest">
                                    Your Hub
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
          </div>
          
          {/* Overlay UI for the Map */}
          <div className="absolute top-4 sm:top-6 left-4 sm:left-6 right-4 sm:right-6 flex justify-between items-start pointer-events-none">
            <div className="glass p-2 sm:p-4 rounded-xl sm:rounded-2xl px-4 sm:px-6 pointer-events-auto bg-gray-900/80 backdrop-blur-md">
              <div className="text-[8px] sm:text-[10px] uppercase font-bold text-gray-500 mb-1">Status</div>
              <div className="text-lg sm:text-xl font-black text-brand-primary uppercase">Active Matrix</div>
            </div>
            <div className="bg-brand-primary text-gray-950 p-2 sm:p-4 rounded-xl sm:rounded-2xl px-4 sm:px-6 pointer-events-auto font-black shadow-lg text-[10px] sm:text-base">
              HYPERLOCAL
            </div>
          </div>
          
          <div className="absolute bottom-4 sm:bottom-6 left-4 sm:left-6 right-4 sm:right-6 glass p-4 sm:p-6 rounded-2xl sm:rounded-3xl pointer-events-auto bg-gray-900/80 backdrop-blur-md border border-white/5">
            <div className="flex items-center justify-between mb-3 sm:mb-4">
              <div className="flex items-center gap-2 sm:gap-3">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-accent overflow-hidden">
                   <div className="w-full h-full bg-gradient-to-br from-brand-accent to-brand-secondary flex items-center justify-center text-white font-bold text-sm sm:text-base">S</div>
                </div>
                <div className="text-left">
                  <div className="font-bold text-white text-xs sm:text-base">SwiftMart India Fleet</div>
                  <div className="text-[10px] sm:text-xs text-brand-primary font-bold uppercase tracking-widest">{serviceability.eta} from nearest node</div>
                </div>
              </div>
              <button className="bg-white/10 hover:bg-white/20 p-2 sm:p-3 rounded-lg sm:rounded-xl transition-colors text-white">
                <Navigation size={18} className="sm:w-5 sm:h-5" />
              </button>
            </div>
            <div className="h-1 w-full bg-white/5 rounded-full overflow-hidden">
               <motion.div 
                className="h-full bg-brand-primary" 
                initial={{ width: "20%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
               />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
