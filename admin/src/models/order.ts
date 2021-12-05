import { Address, Card, Contact, Account } from "./account"
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
  user: Account
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
  startDate: Date,
  endDate: Date,
  totalUsed: number;
}