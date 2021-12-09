import { Address, Card, Contact } from "./account"
import { Product } from "./product"

export type Order = {
  id: string,
  totalPrice: number,
  userId: string;
  couponId?: string,
  orderDetails: OrderDetail[];
  contactId: string,
  contact: Contact,
  cardId: string,
  card: Card,
  addressId: string,
  address: Address,
  createAt: Date,
  coupon?: Coupon,
}

export type OrderDetail = {
  id: string,
  salePrice: string,
  quantity: number,
  orderId: string,
  productId: string,
  product: Product,
}

export type Coupon = {
  code: string;
  id: string,
  discount: number,
}