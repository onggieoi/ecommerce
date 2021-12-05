import { takeLatest } from 'redux-saga/effects';

import { getUsers } from './userReducer';
import { handleGetUsers } from './userHandler';

export default function* userSagas() {
  yield takeLatest(getUsers.type, handleGetUsers);
};
