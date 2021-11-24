import { takeLatest } from 'redux-saga/effects';

import { getMe, login } from './accountReducer';
import { handleLogin, handleGetMe } from './accountHandler';

export default function* accountSaga() {
  yield takeLatest(login.type, handleLogin),
    yield takeLatest(getMe.type, handleGetMe)
};
