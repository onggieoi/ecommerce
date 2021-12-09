import { takeLatest } from 'redux-saga/effects';

import { getMe, login, upsertUser } from './accountReducer';
import { handleLogin, handleGetMe, handleUpsertUser } from './accountHandler';

export default function* accountSaga() {
  yield takeLatest(login.type, handleLogin);
  yield takeLatest(getMe.type, handleGetMe);
  yield takeLatest(upsertUser.type, handleUpsertUser);
};
