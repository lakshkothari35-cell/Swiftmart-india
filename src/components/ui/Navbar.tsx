import { useState } from 'react';
import { ShoppingCart, Search, User, Zap, LogOut, Sun, Moon, Sparkles, Palette, Check, MapPin, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useTheme } from '../../context/ThemeContext';
import { useLocation } from '../../context/LocationContext';
import { Language } from '../../constants/translations';
import { THEMES } from '../../constants/themes';
import { LocationModal } from './LocationModal';

export const Navbar = () => {
  const { totalItems, openCart } = useCart();
  const { openLoginModal, user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const { currentAddress, serviceability } = useLocation();
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [isLocationModalOpen, setIsLocationModalOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 glass-accent m-4 rounded-2xl"
      >
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center neon-glow">
              <Zap className="text-gray-950 fill-gray-950" size={24} />
            </div>
            <span className="text-2xl font-extrabold tracking-tighter neon-text hidden lg:block">SWIFT<span className="text-brand-secondary">MART</span></span>
          </div>

          {/* Location Selector */}
          <button 
            onClick={() => setIsLocationModalOpen(true)}
            className="flex items-center gap-3 text-left group max-w-[200px] sm:max-w-[300px]"
          >
            <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-brand-primary/10 group-hover:border-brand-primary/20 transition-all">
              <MapPin size={20} className="text-brand-primary" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1">
                <span className="text-xs font-black text-white uppercase tracking-tighter truncate">
                  {currentAddress?.type || 'Select Location'}
                </span>
                <ChevronDown size={14} className="text-slate-500 group-hover:text-brand-primary transition-colors" />
              </div>
              <p className="text-[10px] font-bold text-brand-primary truncate uppercase tracking-widest leading-none mt-0.5">
                {currentAddress ? `${serviceability.eta} delivery` : 'Detecting...'}
              </p>
            </div>
          </button>
        </div>

        <div className="hidden xl:flex items-center gap-8 font-medium text-white/70">
          <a href="#" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} className="hover:text-brand-primary transition-colors">{t('nav.home')}</a>
          <a href="#shop" onClick={(e) => scrollToSection(e, 'shop')} className="hover:text-brand-primary transition-colors">{t('nav.shop')}</a>
          <a href="#track" onClick={(e) => scrollToSection(e, 'track')} className="hover:text-brand-primary transition-colors">{t('nav.track')}</a>
        </div>

        <div className="flex items-center gap-2 sm:gap-4">
          <div className="hidden sm:flex items-center gap-0.5 sm:gap-1 bg-white/5 border border-white/10 rounded-lg p-0.5 sm:p-1">
            {(['EN', 'HI', 'GU'] as Language[]).map((l) => (
              <button
                key={l}
                onClick={() => setLanguage(l)}
                className={cn(
                  "px-1.5 sm:px-2 py-1 rounded text-[9px] sm:text-[10px] font-bold transition-colors",
                  language === l ? "bg-brand-primary text-gray-950 shadow-sm" : "text-gray-500 hover:text-white"
                )}
              >
                {l}
              </button>
            ))}
            
            <div className="w-[1px] h-3 bg-white/10 mx-0.5 sm:mx-1" />
            
            <div className="relative">
              <button 
                onClick={() => setShowThemeMenu(!showThemeMenu)}
                className="p-1 hover:text-brand-primary transition-colors flex items-center"
              >
                {theme.id === 'light' ? <Sun size={12} className="sm:w-[14px] sm:h-[14px]" /> : theme.id === 'dark' ? <Moon size={12} className="sm:w-[14px] sm:h-[14px]" /> : <Palette size={12} className="sm:w-[14px] sm:h-[14px]" />}
              </button>
              
              <AnimatePresence>
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    className="absolute right-0 top-full mt-2 w-40 sm:w-48 glass border-white/10 rounded-xl p-1.5 sm:p-2 z-50 shadow-2xl"
                  >
                    <div className="text-[10px] font-bold text-slate-500 p-2 uppercase tracking-widest">Select Theme</div>
                    <div className="space-y-1">
                      {THEMES.map((t) => (
                        <button
                          key={t.id}
                          onClick={() => {
                            setTheme(t.id);
                            setShowThemeMenu(false);
                          }}
                          className={cn(
                            "w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-bold transition-colors",
                            theme.id === t.id ? "bg-brand-primary text-gray-950" : "text-gray-400 hover:bg-white/5 hover:text-white"
                          )}
                        >
                          <span className="flex items-center gap-2">
                            {t.id === 'light' && <Sun size={14} />}
                            {t.id === 'dark' && <Moon size={14} />}
                            {t.id === 'diwali' && <Sparkles size={14} className="text-brand-primary" />}
                            {t.id === 'holi' && <Palette size={14} className="text-secondary" />}
                            {t.id === 'swift' && <Zap size={14} className="text-brand-primary" />}
                            {t.name}
                          </span>
                          {theme.id === t.id && <Check size={12} />}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>

          <a 
            href="#shop" 
            onClick={(e) => scrollToSection(e, 'shop')}
            className="p-2 hover:bg-white/10 rounded-full transition-colors text-brand-primary"
          >
            <Search size={22} />
          </a>
          <button 
            onClick={openCart}
            className="p-2 hover:bg-white/10 rounded-full transition-colors relative"
          >
            <ShoppingCart size={22} />
            {totalItems > 0 && (
              <motion.span 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                key={totalItems}
                className="absolute top-0 right-0 w-4 h-4 bg-brand-accent rounded-full text-[10px] flex items-center justify-center font-bold shadow-[0_0_10px_rgba(255,0,200,0.4)]"
              >
                {totalItems}
              </motion.span>
            )}
          </button>

          {user ? (
            <div className="flex items-center gap-3">
              <div className="hidden sm:flex flex-col items-end">
                <span className="text-xs font-bold text-white">{user.name}</span>
                <button 
                  onClick={logout}
                  className="text-[10px] text-gray-500 hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <LogOut size={10} /> Logout
                </button>
              </div>
              <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-brand-primary">
                <User size={20} />
              </div>
            </div>
          ) : (
            <button 
              onClick={openLoginModal}
              className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-brand-primary to-brand-secondary px-5 py-2.5 rounded-xl font-bold text-gray-900 neon-glow hover:scale-105 transition-transform active:scale-95"
            >
              <User size={18} />
              <span className="hidden lg:inline">Join Now</span>
            </button>
          )}
        </div>
      </motion.nav>

      <LocationModal 
        isOpen={isLocationModalOpen} 
        onClose={() => setIsLocationModalOpen(false)} 
      />
    </>
  );
};
