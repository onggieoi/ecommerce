export type Account = {
  id: string,
  name: string,
  contactNumber: string,
  role: string,
  email: string,
  addresses: Address[],
  cards: Card[],
  contacts: Contact[],
  token?: string;
  schedules: Schedule[],
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
  userId: string,
}

export type Contact = {
  id: string,
  number: string,
  type: 'primary' | 'secondary',
  userId: string,
}

export type Schedule = {
  id: string,
  title: string,
  type: 'primary' | 'secondary',
  time_slot: string,
  userId: string,
}