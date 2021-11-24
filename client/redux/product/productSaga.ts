import { takeLatest } from 'redux-saga/effects';

import { handleGetMoreProducts, handleGetProduct, handleGetProducts } from './productHandler';
import { getMore, getProductDetail, getProducts } from './productReducer';

export default function* productSagas() {
  yield takeLatest(getProducts.type, handleGetProducts),
    yield takeLatest(getMore.type, handleGetMoreProducts),
    yield takeLatest(getProductDetail.type, handleGetProduct)
};
