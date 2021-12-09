import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { CouponRequestPayload, setCoupons, } from "./couponReducer";
import { getCouponRequest, getCouponsRequest } from "./couponRequest";

export function* handleGetCoupon(action: PayloadAction<CouponRequestPayload<string>>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(getCouponRequest, request);

    callback(data);

  } catch (error) {
    callback(error.response.data.message);
  }
}

export function* handleGetCoupons() {
  try {
    const { data } = yield call(getCouponsRequest);

    yield put(setCoupons(data));

  } catch (error) {
    const errorModel = error.response.data as { error: boolean, message: string };

    console.log(errorModel);
  }
}
