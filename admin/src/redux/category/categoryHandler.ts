import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { CategoryRequest, CategoryRequestPayload, setCategories } from "./categoryReducer";
import { deleteCategoryRequest, getCategoriesRequest, upsertCategoryRequest } from "./categoryRequests";

export function* handleGetCategories() {
  try {
    const { data } = yield call(getCategoriesRequest);

    yield put(setCategories(data));

  } catch (error) {
    console.log(error);
  }
}

export function* handleUpsertCategory(action: PayloadAction<CategoryRequestPayload<CategoryRequest>>) {
  const { request, callback } = action.payload;


  try {
    const { data } = yield call(upsertCategoryRequest, request);

    if (data) {
      callback();
    }

  } catch (error) {
    console.log(error);
  }
}

export function* handleDeleteCategories(action: PayloadAction<CategoryRequestPayload<string[]>>) {
  const { request, callback } = action.payload;

  try {
    yield call(deleteCategoryRequest, request);
    callback();

  } catch (error) {
    console.log(error);
  }
}
