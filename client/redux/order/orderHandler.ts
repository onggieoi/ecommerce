import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { OrderRequest, OrderRequestPayload, setOrderDetail, } from "./orderReducer";
import { createOrderRequest, getOrderDetail } from "./orderRequests";

export function* handleCreateOrder(action: PayloadAction<OrderRequestPayload>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(createOrderRequest, request);

    yield put(setOrderDetail(data));

    callback(data.id)

  } catch (error) {
    console.log(error);
  }
}

export function* handleGetOrder(action: PayloadAction<string>) {
  const orderId = action.payload;

  try {
    const { data } = yield call(getOrderDetail, orderId);

    yield put(setOrderDetail(data));

  } catch (error) {
    console.log(error);
  }
}
