import { takeLatest } from 'redux-saga/effects';

import { handleGetCoupon, handleGetCoupons, } from './couponHandler';
import { getCoupons, getCoupon, } from './couponReducer';

export default function* couponSagas() {
  yield takeLatest(getCoupon.type, handleGetCoupon);
  yield takeLatest(getCoupons.type, handleGetCoupons);
};
