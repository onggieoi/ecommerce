import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";

import { CouponRequest, CouponRequestPayload, setCoupons, } from "./couponReducer";
import { upserCouponRequest, getCouponsRequest, deleteCouponsRequest } from "./couponRequest";

export function* handleUpsertCoupon(action: PayloadAction<CouponRequestPayload<CouponRequest>>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(upserCouponRequest, request);

    callback(true, data.code);

  } catch (error) {
    callback(false, error.response.data.message);
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

export function* handleDeleteCoupons(action: PayloadAction<CouponRequestPayload<string[]>>) {
  const { request, callback } = action.payload;

  try {
    const { data } = yield call(deleteCouponsRequest, request);

    callback(true);

  } catch (error) {
    callback(false, error.response.data.message);
  }
}
