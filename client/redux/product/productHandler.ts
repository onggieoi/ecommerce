import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { ProductQuery, setProductDetail, setProducts } from "./productReducer";
import { getProduct, getProductsRequest } from "./productRequests";

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

    yield put(setProducts(data));

  } catch (error) {
    console.log(error);
  }
}

export function* handleGetProduct(action: PayloadAction<string>) {
  const productName = action.payload;

  try {
    const { data } = yield call(getProduct, productName);

    yield put(setProductDetail(data));

  } catch (error) {
    console.log(error);
  }
}
