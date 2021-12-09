import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { LoginRequest, LoginRequestPayload, setMe, UpsertRequest } from "./accountReducer";
import { handleLoginRequest, getMeRequest, upsertUserRequest } from "./accountRequests";

export function* handleLogin(action: PayloadAction<LoginRequestPayload<LoginRequest>>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(handleLoginRequest, request);

    yield put(setMe(data));

    callback(data.token);

  } catch (error) {
    console.log(error);
  }
}

export function* handleGetMe() {
  try {
    const { data } = yield call(getMeRequest);

    yield put(setMe(data));

  } catch (error) {
    console.log(error);
  }
}

export function* handleUpsertUser(action: PayloadAction<LoginRequestPayload<UpsertRequest>>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(upsertUserRequest, request);

    yield put(setMe(data));

    callback(data.token);


  } catch (error) {
    console.log(error);
  }
}
