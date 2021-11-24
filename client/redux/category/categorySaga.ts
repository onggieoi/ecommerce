import { takeLatest } from 'redux-saga/effects';

import { getCategories } from './categoryReducer';
import { handleGetCategories } from './categoryHandler';

export default function* categorySaga() {
  yield takeLatest(getCategories.type, handleGetCategories)
};
