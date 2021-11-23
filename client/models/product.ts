import { Category } from "./category"

export type Product = {
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

export type ProductQuery = {
  page?: number,
  search?: string;
}
