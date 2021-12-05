import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { CreateProductPayLoad, ProductQuery, ProductRequest, setProductDetail, setProducts } from "./productReducer";
import { getProduct, getProductsRequest, createProduct } from "./productRequests";

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

export function* handleCreateProduct(action: PayloadAction<CreateProductPayLoad>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(createProduct, request);

    yield put(setProductDetail(data));

    if (data) {
      callback('success', data.title);
    }

  } catch (error) {
    callback('error', error.response.data.message);
  }
}
