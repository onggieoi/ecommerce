import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { setDashboardReport, } from "./reportReducer";
import { getDashboardRequest } from "./reportRequest";

export function* handleGetDashboardReport() {
  try {
    const { data } = yield call(getDashboardRequest);

    yield put(setDashboardReport(data));

  } catch (error) {
    console.log(error);
  }
}
