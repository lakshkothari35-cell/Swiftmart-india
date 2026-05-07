import { motion, AnimatePresence } from 'motion/react';
import { Navbar } from './components/ui/Navbar';
import { Hero } from './components/ui/Hero';
import { ShopSection } from './components/ui/ShopSection';
import { DeliverySection } from './components/ui/DeliverySection';
import { CartSidebar } from './components/ui/CartSidebar';
import { AuthModal } from './components/ui/AuthModal';
import { CheckoutSuccessModal } from './components/ui/CheckoutSuccessModal';
import { ReceiptModal } from './components/ui/ReceiptModal';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AdminLayout } from './components/admin/AdminLayout';
import { DashboardOverview } from './components/admin/DashboardOverview';
import { InventoryManagement } from './components/admin/InventoryManagement';
import { OrderStream } from './components/admin/OrderStream';
import { CouponManagement } from './components/admin/CouponManagement';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import { ThemeProvider } from './context/ThemeContext';
import { LocationProvider } from './context/LocationContext';

function CustomerSite() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <ShopSection />
        <DeliverySection />
        <CartSidebar />
        <AuthModal />
        <CheckoutSuccessModal />
        <ReceiptModal />
        
      </main>

      <footer className="py-12 border-t border-white/5 text-center text-gray-500">
         <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-12">
               <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-brand-primary rounded flex items-center justify-center">
                  <span className="font-black text-gray-950 text-xs">S</span>
                </div>
                <span className="text-xl font-bold tracking-tighter text-white">SWIFTMART INDIA</span>
              </div>
              <div className="flex gap-8 text-sm">
                 <a href="#" className="hover:text-brand-primary transition-colors">Privacy Policy</a>
                 <a href="#" className="hover:text-brand-primary transition-colors">Career (We are hiring!)</a>
                 <a href="#" className="hover:text-brand-primary transition-colors">Store Locator</a>
                 <a href="#" className="hover:text-brand-primary transition-colors">Sustainability</a>
              </div>
            </div>
            <div className="text-xs space-y-2">
              <p>&copy; 2026 SwiftMart India Retail Pvt Ltd. All Rights Reserved.</p>
              <p className="text-slate-600 italic">Office: Surat Node 1, Adajan, Surat, Gujarat 395009</p>
            </div>
         </div>
      </footer>
    </>
  );
}

export default function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <BrowserRouter>
      <LocationProvider>
        <LanguageProvider>
          <ThemeProvider>
            <AuthProvider>
              <CartProvider>
                <div className="min-h-screen bg-background selection:bg-brand-primary/30">
                  <AnimatePresence>
                    {loading && (
                      <motion.div
                        key="loader"
                        initial={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center"
                      >
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                          className="w-16 h-16 border-4 border-brand-primary border-t-transparent rounded-full mb-4 neon-glow"
                        />
                        <h2 className="text-xl font-bold tracking-widest text-brand-primary animate-pulse uppercase">Connecting to SwiftMart India...</h2>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {!loading && (
                    <Routes>
                      {/* Customer Facing Routes */}
                      <Route path="/" element={<CustomerSite />} />
                      
                      {/* Admin Hub Routes */}
                      <Route path="/admin" element={<AdminLayout children={<DashboardOverview />} />} />
                      <Route path="/admin/orders" element={<AdminLayout children={<OrderStream />} />} />
                      <Route path="/admin/inventory" element={<AdminLayout children={<InventoryManagement />} />} />
                      <Route path="/admin/promotions" element={<AdminLayout children={<CouponManagement />} />} />
                      <Route path="/admin/delivery" element={<AdminLayout children={<div className="p-12 text-center text-slate-500">Logistics Module Loading...</div>} />} />
                      <Route path="/admin/customers" element={<AdminLayout children={<div className="p-12 text-center text-slate-500">Customer CRM Initializing...</div>} />} />
                      <Route path="/admin/settings" element={<AdminLayout children={<div className="p-12 text-center text-slate-500">Core Engine Settings Locked.</div>} />} />
                      
                      {/* Fallback */}
                      <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                  )}
                </div>
              </CartProvider>
            </AuthProvider>
          </ThemeProvider>
        </LanguageProvider>
      </LocationProvider>
    </BrowserRouter>
  );
}


