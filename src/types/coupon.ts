export type CouponType = 'FLAT' | 'PERCENTAGE' | 'FREE_DELIVERY' | 'FIRST_ORDER' | 'CATEGORY';

export interface Coupon {
  id: string;
  code: string;
  title: string;
  title_hi: string;
  title_gu: string;
  description: string;
  description_hi: string;
  description_gu: string;
  type: CouponType;
  value: number; // Discount amount or percentage
  minOrderValue: number;
  maxDiscount?: number;
  expiryDate: string;
  isFirstOrderOnly?: boolean;
  applicableCategories?: string[];
  usageLimit?: number;
  usageCount: number;
}

export interface AppliedCoupon extends Coupon {
  discountAmount: number;
}
