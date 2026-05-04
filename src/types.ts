export type View = 'home' | 'list' | 'signin' | 'signup';

export interface Product {
  id: number;
  name: string;
  brand: string;
  color: string;
  size: string;
  price: number;
  description?: string;
}