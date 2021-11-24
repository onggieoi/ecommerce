import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Category } from "models/category";

type CategoryState = {
  loading: boolean;
  categories: Category[];
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
  }
});

export const {
  getCategories, setCategories,
} = CategorySlice.actions;

const CategoryReducer = CategorySlice.reducer;

export default CategoryReducer;
