import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "../../models/category";

type CategoryState = {
  loading: boolean;
  categories: Category[];
}

export type CategoryRequest = {
  name: string,
  id?: string,
}

export type CategoryRequestPayload<T> = {
  request: T,
  callback: Function;
}

const initialState: CategoryState = {
  loading: false,
  categories: [],
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    getCategories: (state: CategoryState): CategoryState => ({
      ...state,
      loading: true,
    }),
    setCategories: (state: CategoryState, action: PayloadAction<Category[]>) => {
      const categories = action.payload;

      return {
        ...state,
        loading: false,
        categories,
      }
    },
    upsertCategory: (state: CategoryState, action: PayloadAction<CategoryRequestPayload<CategoryRequest>>) => {

      return {
        ...state,
        loading: true,
      }
    },
    deleteCategories: (state: CategoryState, action: PayloadAction<CategoryRequestPayload<string[]>>) => {

      return {
        ...state,
        loading: true,
      }
    }
  }
});

export const {
  getCategories, setCategories, upsertCategory, deleteCategories,
} = CategorySlice.actions;

const CategoryReducer = CategorySlice.reducer;

export default CategoryReducer;
