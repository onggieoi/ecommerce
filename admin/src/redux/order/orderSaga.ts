import { takeLatest } from 'redux-saga/effects';

import { handleCreateOrder, handleGetOrder, handleGetOrders } from './orderHandler';
import { createOrder, getOrderDetail, getOrders, } from './orderReducer';

export default function* orderSaga() {
  yield takeLatest(createOrder.type, handleCreateOrder);
  yield takeLatest(getOrderDetail.type, handleGetOrder);
  yield takeLatest(getOrders.type, handleGetOrders);
};
