import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useCart } from '../../context/CartContext';
import { useAuth } from '../../context/AuthContext';
import { Printer, Download, X, Package, Calendar, User, CreditCard } from 'lucide-react';
import { motion } from 'motion/react';

export const ReceiptModal = () => {
  const { isReceiptOpen, setIsReceiptOpen, lastOrder } = useCart();
  const { user } = useAuth();

  if (!lastOrder) return null;

  return (
    <Dialog open={isReceiptOpen} onOpenChange={(open) => !open && setIsReceiptOpen(false)}>
      <DialogContent className="sm:max-w-2xl bg-slate-950 border-slate-900 text-white p-0 overflow-hidden">
        <div className="relative">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand-primary via-brand-secondary to-brand-accent" />
          
          <div className="p-8 border-b border-white/5 flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-brand-primary flex items-center justify-center text-gray-950">
                <Package size={24} />
              </div>
              <div>
                <h2 className="text-xl font-black">Digital Receipt</h2>
                <p className="text-slate-500 text-xs font-mono uppercase tracking-widest">{lastOrder.id}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button 
                onClick={() => window.print()}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <Printer size={18} />
              </button>
              <button className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white">
                <Download size={18} />
              </button>
              <button 
                onClick={() => setIsReceiptOpen(false)}
                className="p-2 hover:bg-white/5 rounded-lg transition-colors text-slate-400 hover:text-white"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          <div className="p-8 space-y-8 max-h-[60vh] overflow-y-auto scrollbar-hide">
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <User size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Customer</span>
                </div>
                <div>
                  <div className="font-bold text-white leading-tight">{user?.name || 'Guest User'}</div>
                  <div className="text-sm text-slate-500">{user?.email || 'authenticated-session'}</div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-slate-500">
                  <Calendar size={16} />
                  <span className="text-xs font-bold uppercase tracking-widest">Date / Time</span>
                </div>
                <div>
                  <div className="font-bold text-white leading-tight">
                    {new Date(lastOrder.date).toLocaleDateString(undefined, { dateStyle: 'long' })}
                  </div>
                  <div className="text-sm text-slate-500">
                    {new Date(lastOrder.date).toLocaleTimeString(undefined, { timeStyle: 'short' })}
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-slate-500 pb-2 border-b border-white/5">
                <span className="text-xs font-bold uppercase tracking-widest">Digital Essentials</span>
                <span className="text-xs font-bold uppercase tracking-widest">Amount</span>
              </div>
              <div className="space-y-4">
                {lastOrder.items.map((item: any) => (
                  <div key={item.id} className="flex justify-between items-center group">
                    <div className="flex gap-4 items-center">
                      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 overflow-hidden">
                        <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      </div>
                      <div>
                        <div className="font-bold text-slate-200">{item.name}</div>
                        <div className="text-xs text-slate-500">Qty: {item.quantity} x ₹{item.price}</div>
                      </div>
                    </div>
                    <div className="font-mono font-bold text-slate-300">
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 border-t border-white/5 space-y-3">
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Subtotal</span>
                <span className="font-mono text-white">₹{lastOrder.subtotal.toFixed(2)}</span>
              </div>
              
              {lastOrder.discount > 0 && (
                <div className="flex justify-between items-center text-green-400 text-sm">
                  <span className="flex items-center gap-1">
                    Coupon Discount ({lastOrder.couponCode})
                  </span>
                  <span className="font-mono">-₹{lastOrder.discount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>GST (5% Included)</span>
                <span className="font-mono text-white">₹{(lastOrder.subtotal * 0.05).toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-slate-400 text-sm">
                <span>Delivery & Handling</span>
                <span className="font-mono text-white">
                  {lastOrder.deliveryCharge === 0 ? 'FREE' : `₹${lastOrder.deliveryCharge.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between items-center pt-3 border-t border-white/10">
                <div className="flex items-center gap-2">
                  <CreditCard size={18} className="text-brand-primary" />
                  <span className="text-lg font-black uppercase tracking-tighter">Total Paid</span>
                </div>
                <span className="text-2xl font-black text-brand-primary">
                  ₹{lastOrder.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="bg-brand-primary/5 border border-brand-primary/10 rounded-2xl p-6 text-center">
              <div className="text-brand-primary text-xs font-bold uppercase tracking-[0.2em] mb-2">GST Compliant Invoice</div>
              <p className="text-slate-400 text-xs text-left">
                Seller: SwiftMart India Retail Pvt Ltd<br/>
                GSTIN: 24AAACSXXXXZ1ZE (Gujarat Node)<br/>
                <span className="text-slate-500 font-mono mt-2 inline-block">
                  TXN: {Math.random().toString(16).substring(2, 10).toUpperCase()}
                </span>
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
