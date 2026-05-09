import React from 'react';
import { motion } from 'motion/react';
import { Package, Calendar, ChevronRight, ShoppingBag, Clock, CheckCircle, Truck } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useLanguage } from '../../context/LanguageContext';
import { Navbar } from './Navbar';
import { CartSidebar } from './CartSidebar';
import { AuthModal } from './AuthModal';
import { Link } from 'react-router-dom';

export const OrderHistory = () => {
  const { orders } = useCart();
  const { t } = useLanguage();

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Delivered': return <CheckCircle size={16} className="text-emerald-400" />;
      case 'Processing': return <Clock size={16} className="text-amber-400" />;
      case 'Out for Delivery': return <Truck size={16} className="text-brand-primary" />;
      default: return <Package size={16} className="text-slate-400" />;
    }
  };

  return (
    <div className="min-h-screen bg-background text-slate-200">
      <Navbar />
      <CartSidebar />
      <AuthModal />

      <main className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
        <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-brand-primary/10 rounded-lg">
              <ShoppingBag className="text-brand-primary" size={24} />
            </div>
            <h1 className="text-3xl font-black tracking-tight text-white uppercase italic">Order History</h1>
          </div>
          <p className="text-slate-500 font-medium">Track and manage your past deliveries from SwiftMart India.</p>
        </header>

        {orders.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24 bg-white/5 border border-white/10 rounded-[40px] px-8"
          >
            <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package size={40} className="text-slate-600" />
            </div>
            <h2 className="text-xl font-bold text-white mb-2">No orders yet</h2>
            <p className="text-slate-500 mb-8 max-w-xs mx-auto">Looks like you haven't placed any orders yet. Start shopping to see your history here!</p>
            <Link 
              to="/"
              className="inline-flex items-center gap-2 bg-brand-primary text-gray-950 px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-tighter hover:scale-105 active:scale-95 transition-all shadow-[0_4px_20px_rgba(0,242,255,0.3)]"
            >
              Start Shopping
            </Link>
          </motion.div>
        ) : (
          <div className="space-y-6">
            {orders.map((order, idx) => (
              <motion.div
                key={order.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="group relative bg-white/5 border border-white/10 rounded-[32px] overflow-hidden hover:border-brand-primary/30 transition-all hover:bg-white/[0.08]"
              >
                <div className="p-6 sm:p-8">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black text-brand-primary uppercase tracking-widest bg-brand-primary/10 px-2 py-0.5 rounded">Order ID</span>
                        <span className="text-sm font-mono font-bold text-white">{order.id}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-500 text-xs">
                        <Calendar size={12} />
                        <span>{new Date(order.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">Total Amount</div>
                        <div className="text-lg font-black text-white">₹{order.total}</div>
                      </div>
                      <div className="h-10 w-px bg-white/10 hidden sm:block" />
                      <div className="bg-white/5 px-4 py-2 rounded-xl flex items-center gap-2">
                        {getStatusIcon('Delivered')}
                        <span className="text-xs font-bold uppercase tracking-widest text-slate-300">Delivered</span>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                    {order.items.slice(0, 3).map((item: any) => (
                      <div key={item.id} className="flex items-center gap-3 bg-black/20 p-3 rounded-2xl border border-white/5">
                        <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-900 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-white truncate">{item.name}</p>
                          <p className="text-[10px] text-slate-500 font-medium">Qty: {item.quantity}</p>
                        </div>
                      </div>
                    ))}
                    {order.items.length > 3 && (
                      <div className="flex items-center justify-center bg-black/20 p-3 rounded-2xl border border-white/5 text-slate-500 font-bold text-xs italic">
                        +{order.items.length - 3} more items
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-6 border-t border-white/5">
                    <div className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Items: {order.items.length}</div>
                    <button className="flex items-center gap-2 text-brand-primary text-xs font-black uppercase tracking-tighter hover:gap-4 transition-all">
                      View full details <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500 bg-black/20">
         <div className="max-w-7xl mx-auto px-6">
            <div className="text-xs space-y-2">
              <p>&copy; 2026 SwiftMart India Retail Pvt Ltd. All Rights Reserved.</p>
              <p className="text-slate-600 italic">Office: Surat Node 1, Adajan, Surat, Gujarat 395009</p>
            </div>
         </div>
      </footer>
    </div>
  );
};
