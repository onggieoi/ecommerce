import { Address, Card, Contact, Schedule } from "./account";

export interface User {
  id: string,
  name: string,
  contactNumber: string,
  email: string,
  addresses: Address[],
  cards: Card[],
  contacts: Contact[],
  schedules: Schedule[],
  createAt: Date,
}

export interface Customer extends User {
  totalOrder: number,
  totalAmount: number,
}