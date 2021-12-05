import { User } from "./user"

export interface Account extends User {
  token?: string;
}

export type Address = {
  id: string,
  name: string,
  type: 'primary' | 'secondary',
  info: string,
}

export type Card = {
  id: string,
  name: string,
  type: 'primary' | 'secondary',
  cardType: 'visa' | 'paypal' | 'master',
  lastFourDigit: string,
}

export type Contact = {
  id: string,
  number: string,
  type: 'primary' | 'secondary',
}

export type Schedule = {
  id: string,
  title: string,
  type: 'primary' | 'secondary',
  time_slot: string,
}