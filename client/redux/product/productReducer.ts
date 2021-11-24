import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Paging } from "models/paging";
import { Product } from "models/product";

type ProductState = {
  loading: boolean;
  data: Paging<Product>;
  productDetail?: Product;
}

const initialState: ProductState = {
  loading: false,
  data: {
    totalItems: 0,
    currentPage: 1,
    items: [],
    hasMore: false,
  }
};

export type ProductQuery = {
  page: number;
  category?: string;
  search?: string;
}

const ProductSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    getProducts: (state: ProductState, action: PayloadAction<ProductQuery>): ProductState => ({
      ...state,
      loading: true,
    }),
    getMore: (state: ProductState, action: PayloadAction<ProductQuery>) => ({
      ...state,
    }),
    getProductDetail: (state: ProductState, action: PayloadAction<string>): ProductState => ({
      ...state,
      loading: true,
    }),
    setProducts: (state: ProductState, action: PayloadAction<Paging<Product>>) => {
      const data = action.payload;

      if (data.currentPage > 1) {

        return {
          ...state,
          loading: false,
          data: {
            ...data,
            items: [...state.data.items, ...data.items],
          },
        }
      }

      return {
        ...state,
        loading: false,
        data,
      }
    },
    setProductDetail: (state: ProductState, action: PayloadAction<Product>) => {
      const productDetail = action.payload;

      return {
        ...state,
        loading: false,
        productDetail,
      }
    },
  }
});

export const {
  getProducts, getProductDetail, getMore, setProducts, setProductDetail,
} = ProductSlice.actions;


const ProductReducer = ProductSlice.reducer
export default ProductReducer;
