import { takeLatest } from 'redux-saga/effects';

import { deleteCategories, getCategories, upsertCategory } from './categoryReducer';
import { handleGetCategories, handleUpsertCategory, handleDeleteCategories } from './categoryHandler';

export default function* categorySaga() {
  yield takeLatest(getCategories.type, handleGetCategories);
  yield takeLatest(upsertCategory.type, handleUpsertCategory);
  yield takeLatest(deleteCategories.type, handleDeleteCategories);
};
