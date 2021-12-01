import { Category } from "./category"

export interface Product {
  id: string;
  title: string;
  description: string;
  image: string;
  type: string;
  price: number;
  unit: string;
  salePrice: number;
  discountInPercent: number;
  categories: Category[];
  gallery: Gallery[];
}

export type Gallery = {
  url: string;
}

export interface ProductCart extends Product {
  quantity: number;
}
