import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { Product, CartItem } from '../types';
import { Coupon, AppliedCoupon } from '../types/coupon';
import { COUPONS } from '../constants/coupons';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
  totalItems: number;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
  updateQuantity: (productId: string, delta: number) => void;
  isCheckoutSuccess: boolean;
  setIsCheckoutSuccess: (val: boolean) => void;
  checkout: () => void;
  lastOrder: any | null;
  orders: any[];
  unseenOrdersCount: number;
  resetUnseenOrders: () => void;
  isReceiptOpen: boolean;
  setIsReceiptOpen: (val: boolean) => void;
  
  // Coupon System
  appliedCoupon: AppliedCoupon | null;
  applyCoupon: (code: string) => { success: boolean; message?: string };
  removeCoupon: () => void;
  discountAmount: number;
  subtotal: number;
  deliveryCharge: number;
  grandTotal: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isCheckoutSuccess, setIsCheckoutSuccess] = useState(false);
  const [lastOrder, setLastOrder] = useState<any | null>(null);
  const [orders, setOrders] = useState<any[]>(() => {
    const savedOrders = localStorage.getItem('swiftmart_orders');
    if (savedOrders) {
      try {
        return JSON.parse(savedOrders);
      } catch (e) {
        console.error('Error parsing saved orders:', e);
      }
    }
    return [];
  });
  const [unseenOrdersCount, setUnseenOrdersCount] = useState(() => {
    const savedUnseenCount = localStorage.getItem('swiftmart_unseen_orders');
    return savedUnseenCount ? parseInt(savedUnseenCount) || 0 : 0;
  });
  const [isReceiptOpen, setIsReceiptOpen] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<AppliedCoupon | null>(null);

  // Save orders to localStorage when they change
  useEffect(() => {
    localStorage.setItem('swiftmart_orders', JSON.stringify(orders));
  }, [orders]);

  useEffect(() => {
    localStorage.setItem('swiftmart_unseen_orders', unseenOrdersCount.toString());
  }, [unseenOrdersCount]);

  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const deliveryCharge = appliedCoupon?.type === 'FREE_DELIVERY' && subtotal >= (appliedCoupon.minOrderValue || 0) ? 0 : 5;

  // Real-time discount calculation
  const calculateDiscount = (coupon: Coupon, currentSubtotal: number): number => {
    if (currentSubtotal < coupon.minOrderValue) return 0;

    let discount = 0;
    if (coupon.type === 'FLAT') {
      discount = coupon.value;
    } else if (coupon.type === 'PERCENTAGE' || coupon.type === 'FIRST_ORDER') {
      // For category based, only calculate on specific items
      const relevantTotal = coupon.applicableCategories 
        ? cart.filter(item => coupon.applicableCategories?.includes(item.category)).reduce((sum, item) => sum + (item.price * item.quantity), 0)
        : currentSubtotal;
      
      discount = (relevantTotal * coupon.value) / 100;
      if (coupon.maxDiscount) discount = Math.min(discount, coupon.maxDiscount);
    } else if (coupon.type === 'FREE_DELIVERY') {
      discount = 5; // The delivery fee
    }

    return Math.round(discount);
  };

  const discountAmount = appliedCoupon ? calculateDiscount(appliedCoupon, subtotal) : 0;
  const grandTotal = Math.max(0, subtotal + deliveryCharge - discountAmount);

  // Auto-validate coupon when cart changes
  useEffect(() => {
    if (appliedCoupon && subtotal < appliedCoupon.minOrderValue) {
      // Silently remove if condition no longer met
      setAppliedCoupon(null);
    }
  }, [subtotal, appliedCoupon]);

  const applyCoupon = (code: string) => {
    const coupon = COUPONS.find(c => c.code.toUpperCase() === code.toUpperCase());
    
    if (!coupon) return { success: false, message: 'invalid' };
    if (subtotal < coupon.minOrderValue) {
      return { 
        success: false, 
        message: 'minOrderError', 
        extra: { amount: coupon.minOrderValue - subtotal } 
      };
    }

    const discount = calculateDiscount(coupon, subtotal);
    setAppliedCoupon({ ...coupon, discountAmount: discount });
    return { success: true };
  };

  const removeCoupon = () => setAppliedCoupon(null);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    setIsOpen(true); // Auto-open cart when item added
  };

  const updateQuantity = (productId: string, delta: number) => {
    setCart((prev) => 
      prev.map((item) => {
        if (item.id === productId) {
          const newQuantity = Math.max(0, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      }).filter((item) => item.quantity > 0)
    );
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== productId));
  };

  const clearCart = () => {
    setCart([]);
    setAppliedCoupon(null);
  };

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);

  const checkout = () => {
    const orderData = {
      id: `SWIFT-${Math.floor(Math.random() * 1000000)}`,
      items: [...cart],
      subtotal,
      discount: discountAmount,
      deliveryCharge,
      total: grandTotal,
      couponCode: appliedCoupon?.code,
      date: new Date().toISOString()
    };
    setLastOrder(orderData);
    setOrders(prev => [orderData, ...prev]);
    setUnseenOrdersCount(prev => prev + 1);
    setIsOpen(false);
    setIsCheckoutSuccess(true);
    setCart([]);
    setAppliedCoupon(null);
  };

  const resetUnseenOrders = () => {
    setUnseenOrdersCount(0);
  };

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <CartContext.Provider value={{ 
      cart, 
      addToCart, 
      removeFromCart, 
      clearCart, 
      totalItems,
      isOpen,
      openCart,
      closeCart,
      updateQuantity,
      isCheckoutSuccess,
      setIsCheckoutSuccess,
      checkout,
      lastOrder,
      orders,
      unseenOrdersCount,
      resetUnseenOrders,
      isReceiptOpen,
      setIsReceiptOpen,
      appliedCoupon,
      applyCoupon,
      removeCoupon,
      discountAmount,
      subtotal,
      deliveryCharge,
      grandTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
