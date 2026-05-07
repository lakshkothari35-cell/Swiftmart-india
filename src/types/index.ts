export interface Product {
  id: string;
  name: string;
  name_hi?: string;
  name_gu?: string;
  price: number;
  mrp: number;
  category: string;
  image: string;
  description: string;
  description_hi?: string;
  description_gu?: string;
  color: string;
  unit: string;
  unit_hi?: string;
  unit_gu?: string;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface Address {
  id: string;
  type: 'Home' | 'Work' | 'Other';
  full_address: string;
  house_no?: string;
  area?: string;
  landmark?: string;
  city: string;
  state: string;
  pincode: string;
  lat: number;
  lng: number;
}

export type Category = 'Grocery' | 'Dairy' | 'Fruits & Veggies' | 'Snacks' | 'Beverages' | 'Personal Care' | 'Household';
