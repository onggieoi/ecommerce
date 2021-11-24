import { takeLatest } from 'redux-saga/effects';

import { handleCreateOrder, handleGetOrder } from './orderHandler';
import { createOrder, getOrderDetail, } from './orderReducer';

export default function* orderSaga() {
  yield takeLatest(createOrder.type, handleCreateOrder),
    yield takeLatest(getOrderDetail.type, handleGetOrder)
};
