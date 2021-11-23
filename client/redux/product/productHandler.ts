import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { Product, ProductQuery } from "models/product";
import { setMore, setProducts } from "./productReducer";
import { getMoreProductsRequest, getProductsRequest } from "./productRequests";

export function* handleGetProducts(action: PayloadAction<ProductQuery | undefined>) {
  const productQuery = action.payload;

  try {
    const { data } = yield call(getProductsRequest, productQuery);

    yield put(setProducts(data));

  } catch (error) {
    console.log(error);
  }
}

export function* handleGetMoreProducts(action: PayloadAction<ProductQuery | undefined>) {
  const productQuery = action.payload;

  try {
    const { data } = yield call(getProductsRequest, productQuery);

    yield put(setMore(data));

  } catch (error) {
    console.log(error);
  }
}