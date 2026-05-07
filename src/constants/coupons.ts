import { Coupon } from '../types/coupon';

export const COUPONS: Coupon[] = [
  {
    id: 'c1',
    code: 'SWIFT100',
    title: '₹100 OFF',
    title_hi: '₹100 की छूट',
    title_gu: '₹100 વળતર',
    description: 'Flat ₹100 off on orders above ₹599',
    description_hi: '₹599 से ऊपर के ऑर्डर पर ₹100 की सीधी छूट',
    description_gu: '₹599 થી વધુના ઓર્ડર પર ₹100 ફ્લેટ ડિસ્કાઉન્ટ',
    type: 'FLAT',
    value: 100,
    minOrderValue: 599,
    expiryDate: '2026-12-31',
    usageCount: 1420
  },
  {
    id: 'c2',
    code: 'NEWBIE',
    title: '50% OFF',
    title_hi: '50% छूट',
    title_gu: '50% વળતર',
    description: 'Special 50% discount for your first order (Max ₹150)',
    description_hi: 'आपके पहले ऑर्डर के लिए विशेष 50% छूट (अधिकतम ₹150)',
    description_gu: 'તમારા પ્રથમ ઓર્ડર માટે વિશેષ 50% ડિસ્કાઉન્ટ (મહત્તમ ₹150)',
    type: 'FIRST_ORDER',
    value: 50,
    minOrderValue: 199,
    maxDiscount: 150,
    isFirstOrderOnly: true,
    expiryDate: '2026-12-31',
    usageCount: 8500
  },
  {
    id: 'c3',
    code: 'FREEDEL',
    title: 'FREE DELIVERY',
    title_hi: 'मुफ्त डिलीवरी',
    title_gu: 'મફત ડિલિવરી',
    description: 'Get free delivery on orders above ₹299',
    description_hi: '₹299 से ऊपर के ऑर्डर पर मुफ्त डिलीवरी पाएं',
    description_gu: '₹299 થી વધુના ઓર્ડર પર મફત ડિલિવરી મેળવો',
    type: 'FREE_DELIVERY',
    value: 5, // Delivery charge is ₹5, so this wipes it out
    minOrderValue: 299,
    expiryDate: '2026-12-31',
    usageCount: 5200
  },
  {
    id: 'c4',
    code: 'DIWALI24',
    title: 'FESTIVAL 20%',
    title_hi: 'त्योहार 20% छूट',
    title_gu: 'તહેવાર 20% વળતર',
    description: 'Celebrate with 20% OFF on all Grocery items',
    description_hi: 'सभी किराना वस्तुओं पर 20% छूट के साथ जश्न मनाएं',
    description_gu: 'બધા કરિયાણાની વસ્તુઓ પર 20% વળતર સાથે ઉજવણી કરો',
    type: 'PERCENTAGE',
    value: 20,
    minOrderValue: 499,
    maxDiscount: 200,
    applicableCategories: ['Grocery'],
    expiryDate: '2026-11-15',
    usageCount: 120
  }
];
