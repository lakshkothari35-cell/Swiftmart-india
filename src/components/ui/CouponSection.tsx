import { useState } from 'react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { COUPONS } from '../../constants/coupons';
import { Ticket, ChevronRight, X, Check, Loader2, Sparkles, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export const CouponSection = () => {
  const { appliedCoupon, applyCoupon, removeCoupon, subtotal } = useCart();
  const { t, language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);
  const [manualCode, setManualCode] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleApply = async (code: string) => {
    setIsLoading(true);
    setError(null);
    
    // Simulate server validation delay
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const result = applyCoupon(code);
    setIsLoading(false);
    
    if (result.success) {
      setIsExpanded(false);
      setManualCode('');
    } else {
      let msg = t(`coupons.${result.message}`);
      if (result.message === 'minOrderError' && (result as any).extra) {
        msg = msg.replace('{amount}', (result as any).extra.amount.toString());
      }
      setError(msg);
    }
  };

  const getTranslatedCoupon = (coupon: any) => {
    if (language === 'HI') return { ...coupon, title: coupon.title_hi, description: coupon.description_hi };
    if (language === 'GU') return { ...coupon, title: coupon.title_gu, description: coupon.description_gu };
    return coupon;
  };

  // Recommended coupons: logic to pick best for user
  const recommendedCoupons = COUPONS.filter(c => subtotal >= c.minOrderValue - 200).slice(0, 2);

  return (
    <div className="pt-6 border-t border-white/5 space-y-4">
      <div className="flex items-center justify-between">
        <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
          <Ticket size={14} className="text-brand-primary" />
          {t('coupons.title')}
        </h4>
        {!appliedCoupon && (
          <button 
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-bold text-brand-primary hover:underline flex items-center gap-1"
          >
            {isExpanded ? t('coupons.remove') : t('coupons.viewAll')}
            {!isExpanded && <ChevronRight size={12} />}
          </button>
        )}
      </div>

      <AnimatePresence mode="wait">
        {appliedCoupon ? (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="group relative bg-brand-primary/10 border border-brand-primary/20 rounded-xl p-4 overflow-hidden"
          >
            <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-primary/20 flex items-center justify-center text-brand-primary">
                  <Check size={20} />
                </div>
                <div>
                  <p className="text-brand-primary font-black text-sm uppercase tracking-wider">{appliedCoupon.code}</p>
                  <p className="text-green-400 font-bold text-xs">
                    {t('coupons.applied')}! ₹{appliedCoupon.discountAmount} saved
                  </p>
                </div>
              </div>
              <button 
                onClick={removeCoupon}
                className="p-2 hover:bg-brand-primary/10 rounded-lg text-slate-400 hover:text-white transition-colors"
              >
                <X size={16} />
              </button>
            </div>
            {/* Animated background flare */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-primary/5 blur-3xl rounded-full -mr-16 -mt-16 pointer-events-none" />
          </motion.div>
        ) : (
          <motion.div 
            initial={false}
            animate={{ height: isExpanded ? 'auto' : 'auto' }}
            className="space-y-3"
          >
            {/* Input Field */}
            <div className="relative">
              <input 
                type="text"
                placeholder={t('coupons.inputPlaceholder')}
                value={manualCode}
                onChange={(e) => setManualCode(e.target.value.toUpperCase())}
                onKeyDown={(e) => e.key === 'Enter' && handleApply(manualCode)}
                className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-4 pr-24 text-sm focus:outline-none focus:border-brand-primary/50 transition-all font-mono tracking-widest placeholder:font-sans placeholder:tracking-normal"
              />
              <button 
                disabled={!manualCode || isLoading}
                onClick={() => handleApply(manualCode)}
                className="absolute right-2 top-2 bottom-2 px-4 bg-brand-primary text-gray-950 text-[10px] font-black rounded-lg disabled:opacity-50 disabled:grayscale hover:scale-105 transition-transform active:scale-95 flex items-center gap-2"
              >
                {isLoading ? <Loader2 size={14} className="animate-spin" /> : t('coupons.apply')}
              </button>
            </div>

            {error && (
              <p className="text-rose-400 text-[10px] font-bold pl-1 animate-pulse">
                {error}
              </p>
            )}

            {/* Recommendations */}
            {!isExpanded && recommendedCoupons.length > 0 && (
              <div className="space-y-2 pt-2">
                <p className="text-[10px] font-bold text-slate-600 uppercase tracking-wider flex items-center gap-1">
                  <Sparkles size={10} className="text-brand-secondary" />
                  {t('coupons.bestForYou')}
                </p>
                {recommendedCoupons.map(getTranslatedCoupon).map((coupon) => (
                  <button
                    key={coupon.id}
                    onClick={() => handleApply(coupon.code)}
                    className="w-full flex items-center justify-between p-3 bg-white/5 border border-white/5 hover:border-brand-primary/30 rounded-xl group transition-all"
                  >
                    <div className="text-left">
                      <p className="text-white font-bold text-xs">{coupon.title}</p>
                      <p className="text-slate-500 text-[10px]">{coupon.description}</p>
                    </div>
                    <div className="px-3 py-1 bg-white/5 rounded-lg border border-white/10 group-hover:bg-brand-primary group-hover:text-gray-950 transition-colors text-[10px] font-black tracking-widest">
                      {coupon.code}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Full List Expanded */}
            {isExpanded && (
              <div className="space-y-2 pt-2">
                {COUPONS.map(getTranslatedCoupon).map((coupon) => {
                  const isLocked = subtotal < coupon.minOrderValue;
                  return (
                    <div 
                      key={coupon.id}
                      className={cn(
                        "relative p-4 rounded-xl border transition-all overflow-hidden",
                        isLocked ? "bg-slate-900/50 border-white/5 opacity-80" : "bg-white/5 border-white/10 hover:border-brand-primary/30"
                      )}
                    >
                      <div className="flex justify-between items-start mb-2">
                        <div className="flex items-center gap-2">
                          <div className={cn(
                            "w-8 h-8 rounded-lg flex items-center justify-center",
                            isLocked ? "bg-slate-800 text-slate-600" : "bg-brand-primary/10 text-brand-primary"
                          )}>
                            <Tag size={16} />
                          </div>
                          <div>
                            <p className="font-extrabold text-xs text-white">{coupon.title}</p>
                            <div className="inline-block px-1.5 py-0.5 bg-slate-800 border border-white/10 rounded font-mono text-[9px] font-bold text-slate-400 tracking-wider">
                              {coupon.code}
                            </div>
                          </div>
                        </div>
                        <button
                          disabled={isLocked || isLoading}
                          onClick={() => handleApply(coupon.code)}
                          className={cn(
                            "px-4 py-1.5 rounded-lg text-[10px] font-black transition-all",
                            isLocked 
                              ? "text-slate-600 border border-white/5 cursor-not-allowed" 
                              : "bg-brand-primary text-gray-950 hover:scale-105 active:scale-95"
                          )}
                        >
                          {t('coupons.apply')}
                        </button>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed mb-2 pr-12">{coupon.description}</p>
                      {isLocked && (
                        <div className="flex items-center gap-1.5 text-[9px] font-bold text-brand-secondary">
                          <div className="h-1 flex-grow bg-slate-800 rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-brand-secondary transition-all" 
                              style={{ width: `${(subtotal / coupon.minOrderValue) * 100}%` }}
                            />
                          </div>
                          <span>Add ₹{coupon.minOrderValue - subtotal} more</span>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
