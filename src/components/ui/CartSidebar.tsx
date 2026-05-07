import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { ShoppingCart, Trash2, Plus, Minus, CreditCard, Wallet, Smartphone, Banknote, Tag } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useState } from 'react';
import { CouponSection } from './CouponSection';
import { CardForm } from './CardForm';
import { UPIForm } from './UPIForm';
import { cn } from '../../lib/utils';

export const CartSidebar = () => {
  const { 
    cart, 
    isOpen, 
    closeCart, 
    removeFromCart, 
    updateQuantity, 
    totalItems, 
    checkout,
    discountAmount,
    subtotal,
    deliveryCharge,
    grandTotal,
    appliedCoupon
  } = useCart();
  const { user, openLoginModal } = useAuth();
  const { language, t } = useLanguage();
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'COD'>('UPI');
  const [isUPIValid, setIsUPIValid] = useState(false);
  const [isCardValid, setIsCardValid] = useState(false);

  // Reset validation states when payment method changes
  const handlePaymentMethodChange = (method: 'UPI' | 'CARD' | 'COD') => {
    setPaymentMethod(method);
    if (method === 'COD') {
      setIsUPIValid(true);
      setIsCardValid(true);
    }
  };

  const isPaymentValid = () => {
    if (paymentMethod === 'UPI') return isUPIValid;
    if (paymentMethod === 'CARD') return isCardValid;
    return true; // COD is always "valid" in terms of details
  };

  const getTranslatedItem = (item: any) => {
    if (language === 'HI') {
      return {
        ...item,
        name: item.name_hi || item.name,
        unit: item.unit_hi || item.unit
      };
    }
    if (language === 'GU') {
      return {
        ...item,
        name: item.name_gu || item.name,
        unit: item.unit_gu || item.unit
      };
    }
    return item;
  };

  const handleCheckout = () => {
    if (!user) {
      closeCart();
      openLoginModal();
      return;
    }
    checkout();
  };

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <SheetContent className="w-full sm:max-w-md bg-slate-950 border-slate-900 text-white p-0 flex flex-col">
        <SheetHeader className="p-6 border-b border-white/5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                <ShoppingCart size={20} />
              </div>
              <div>
                <SheetTitle className="text-white text-xl font-bold">{t('cart.title')}</SheetTitle>
                <SheetDescription className="text-slate-500 text-xs">
                  {totalItems} {totalItems === 1 ? 'item' : 'items'} ready for harvest
                </SheetDescription>
              </div>
            </div>
          </div>
        </SheetHeader>

        <div className="flex-1 overflow-y-auto p-6 scrollbar-hide">
          <AnimatePresence mode="popLayout" initial={false}>
            {cart.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="h-full flex flex-col items-center justify-center text-center py-12"
              >
                <div className="w-20 h-20 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                  <ShoppingCart size={32} className="text-slate-600" />
                </div>
                <h3 className="text-lg font-bold mb-2">{t('cart.empty')}</h3>
                <p className="text-slate-500 text-sm max-w-[200px] mb-8">
                  {t('cart.emptySub')}
                </p>
                <button 
                  onClick={() => {
                    closeCart();
                    document.getElementById('shop')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="px-8 py-3 bg-brand-primary text-gray-950 font-bold rounded-xl hover:scale-105 transition-transform active:scale-95"
                >
                  {t('hero.cta')}
                </button>
              </motion.div>
            ) : (
              <div className="space-y-8">
                <div className="space-y-6">
                  {cart.map(getTranslatedItem).map((item) => (
                    <motion.div 
                      key={item.id}
                      layout
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, scale: 0.95 }}
                      className="flex gap-4 group"
                    >
                      <div className="w-20 h-20 rounded-2xl bg-white/5 border border-white/10 overflow-hidden group-hover:border-brand-primary/30 transition-colors">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div className="flex-1 flex flex-col">
                        <div className="flex justify-between items-start mb-1">
                          <h4 className="font-bold text-slate-200 text-sm">{item.name}</h4>
                          <button 
                            onClick={() => removeFromCart(item.id)}
                            className="text-slate-600 hover:text-red-400 p-1 transition-colors"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                        <div className="text-[10px] text-slate-500 mb-2 font-bold uppercase tracking-wider">{item.unit}</div>
                        <div className="mt-auto flex items-center justify-between">
                          <div className="flex items-center gap-3 bg-white/5 border border-white/10 rounded-lg p-1">
                            <button 
                              onClick={() => updateQuantity(item.id, -1)}
                              className="p-1 hover:bg-white/10 rounded-md transition-colors text-slate-400"
                            >
                              <Minus size={12} />
                            </button>
                            <span className="text-xs font-mono font-bold w-4 text-center">{item.quantity}</span>
                            <button 
                              onClick={() => updateQuantity(item.id, 1)}
                              className="p-1 hover:bg-white/10 rounded-md transition-colors text-brand-primary"
                            >
                              <Plus size={12} />
                            </button>
                          </div>
                          <div className="font-bold text-brand-secondary text-sm">
                            ₹{(item.price * item.quantity)}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Payment Method Selector */}
                <div className="space-y-4 pt-6 border-t border-white/5">
                  <h4 className="text-xs font-bold text-slate-500 uppercase tracking-widest">{t('cart.paymentHeader')}</h4>
                  <div className="grid grid-cols-3 gap-3">
                    <button 
                      onClick={() => handlePaymentMethodChange('UPI')}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        paymentMethod === 'UPI' 
                          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                          : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                      }`}
                    >
                      <Smartphone size={20} />
                      <span className="text-[10px] font-bold">UPI</span>
                    </button>
                    <button 
                      onClick={() => handlePaymentMethodChange('CARD')}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        paymentMethod === 'CARD' 
                          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                          : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                      }`}
                    >
                      <Wallet size={20} />
                      <span className="text-[10px] font-bold">CARD</span>
                    </button>
                    <button 
                      onClick={() => handlePaymentMethodChange('COD')}
                      className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-all ${
                        paymentMethod === 'COD' 
                          ? 'bg-brand-primary/10 border-brand-primary text-brand-primary' 
                          : 'bg-white/5 border-white/10 text-slate-500 hover:bg-white/10'
                      }`}
                    >
                      <Banknote size={20} />
                      <span className="text-[10px] font-bold">CASH</span>
                    </button>
                  </div>

                  {paymentMethod === 'UPI' && <UPIForm onValidationChange={setIsUPIValid} />}

                  {paymentMethod === 'CARD' && <CardForm onValidationChange={setIsCardValid} />}
                </div>

                <CouponSection />
              </div>
            )}
          </AnimatePresence>
        </div>

        {cart.length > 0 && (
          <div className="p-6 bg-slate-900 border-t border-white/5 space-y-4">
            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{t('cart.subtotal')}</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>

            {discountAmount > 0 && (
              <div className="flex justify-between items-center text-green-400 text-xs font-bold">
                <span className="flex items-center gap-1">
                  <Tag size={12} />
                  Coupon Discount ({appliedCoupon?.code})
                </span>
                <span>-₹{discountAmount.toFixed(2)}</span>
              </div>
            )}

            <div className="flex justify-between items-center text-slate-400 text-xs">
              <span>{t('cart.handling')}</span>
              <span className={cn(deliveryCharge === 0 ? "text-green-400 font-bold" : "text-brand-primary")}>
                {deliveryCharge === 0 ? 'FREE' : `₹${deliveryCharge.toFixed(2)}`}
              </span>
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-lg font-bold">{t('cart.total')}</span>
              <div className="text-right">
                <span className="text-2xl font-black text-brand-primary shadow-brand-primary/20 bg-clip-text text-transparent bg-gradient-to-r from-brand-primary to-brand-secondary">
                  ₹{grandTotal.toFixed(2)}
                </span>
                {discountAmount > 0 && (
                  <p className="text-[10px] font-bold text-green-400 mt-1">
                    {t('coupons.savings')}{discountAmount} 🎉
                  </p>
                )}
              </div>
            </div>
            <button 
              onClick={handleCheckout}
              disabled={!isPaymentValid()}
              className={cn(
                "w-full py-4 rounded-2xl font-black flex items-center justify-center gap-3 transition-all shadow-[0_4px_20px_rgba(0,242,255,0.2)]",
                isPaymentValid() 
                  ? "bg-gradient-to-r from-brand-primary to-brand-secondary text-gray-950 hover:translate-y-[-2px] active:translate-y-[1px]" 
                  : "bg-white/5 text-slate-500 cursor-not-allowed border border-white/5"
              )}
            >
              <CreditCard size={20} />
              {paymentMethod === 'COD' ? t('cart.placeOrder') : t('cart.payAndPlace')}
            </button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
};
