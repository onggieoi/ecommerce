import { takeLatest } from 'redux-saga/effects';

import { handleGetMoreProducts, handleGetProducts } from './productHandler';
import { getMore, getProducts } from './productReducer';

export default function* productSagas() {
  yield takeLatest(getProducts.type, handleGetProducts),
    yield takeLatest(getMore.type, handleGetMoreProducts)
};
