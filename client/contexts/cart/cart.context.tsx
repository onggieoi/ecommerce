import { Coupon } from 'models/order';
import { Product, ProductCart } from 'models/product';
import { createContext } from 'react';

interface Products {
  products: ProductCart[];
}

interface ContextProps extends Products {
  cartState: any;
  dispatch: any;
  totalPrice: number;
  discount: number;
  add: Function;
  update: Function;
  coupon: Coupon;
  addCoupon: Function;
  removeCoupon: Function;
  subtotalPrice: any;
  clearCart: Function;
}

export const CartContext = createContext({} as ContextProps);
