import { Dialog, DialogContent } from '@/components/ui/dialog';
import { useCart } from '../../context/CartContext';
import { CheckCircle, ArrowRight, ShoppingBag } from 'lucide-react';
import { motion } from 'motion/react';

export const CheckoutSuccessModal = () => {
  const { isCheckoutSuccess, setIsCheckoutSuccess, setIsReceiptOpen } = useCart();

  return (
    <Dialog open={isCheckoutSuccess} onOpenChange={(open) => !open && setIsCheckoutSuccess(false)}>
      <DialogContent className="sm:max-w-md bg-slate-950 border-slate-900 text-white p-0 overflow-hidden">
        <div className="relative p-10 flex flex-col items-center text-center">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
          
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 12, stiffness: 200 }}
            className="w-24 h-24 rounded-full bg-brand-primary/20 flex items-center justify-center text-brand-primary mb-8"
          >
            <CheckCircle size={48} />
          </motion.div>

          <h2 className="text-3xl font-black mb-4">Aapka Order Confirm Hai!</h2>
          <p className="text-slate-400 mb-8 max-w-xs">
            Your essentials are being packed and our partner will reach your landmark shortly.
          </p>

          <div className="w-full bg-white/5 border border-white/10 rounded-2xl p-6 mb-8 text-left">
            <div className="flex justify-between items-center mb-2">
              <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Order ID</span>
              <span className="text-brand-primary font-mono font-bold">#SWIFT-{Math.floor(Math.random() * 1000000)}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-slate-500 text-xs uppercase tracking-widest font-bold">Status</span>
              <span className="text-brand-secondary font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-secondary animate-pulse" />
                Processing
              </span>
            </div>
          </div>

          <div className="flex flex-col w-full gap-3">
            <button 
              onClick={() => setIsCheckoutSuccess(false)}
              className="w-full bg-white text-gray-950 py-4 rounded-xl font-black flex items-center justify-center gap-3 hover:bg-brand-primary transition-all active:scale-95"
            >
              <ShoppingBag size={20} />
              CONTINUE SHOPPING
            </button>
            <button 
              onClick={() => {
                setIsCheckoutSuccess(false);
                setIsReceiptOpen(true);
              }}
              className="w-full py-4 text-slate-500 font-bold hover:text-white transition-colors flex items-center justify-center gap-2"
            >
              VIEW RECEIPT <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
