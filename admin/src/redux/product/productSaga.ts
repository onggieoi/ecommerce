import { takeLatest } from 'redux-saga/effects';

import { handleGetMoreProducts, handleGetProduct, handleGetProducts, handleCreateProduct } from './productHandler';
import { createProduct, getMore, getProductDetail, getProducts } from './productReducer';

export default function* productSagas() {
  yield takeLatest(getProducts.type, handleGetProducts);
  yield takeLatest(getMore.type, handleGetMoreProducts);
  yield takeLatest(getProductDetail.type, handleGetProduct);
  yield takeLatest(createProduct.type, handleCreateProduct);
};
