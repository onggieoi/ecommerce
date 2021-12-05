import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { setUsers } from "./userReducer";
import { getUsersRequest } from "./userRequest";


export function* handleGetUsers() {
  try {
    const { data } = yield call(getUsersRequest);

    yield put(setUsers(data));

  } catch (error) {
    console.log(error);
  }
}
