import { takeLatest } from 'redux-saga/effects';

import { handleGetCoupons, handleUpsertCoupon, handleDeleteCoupons } from './couponHandler';
import { upsertCoupon, getCoupons, deleteCoupons, } from './couponReducer';

export default function* couponSagas() {
  yield takeLatest(upsertCoupon.type, handleUpsertCoupon);
  yield takeLatest(getCoupons.type, handleGetCoupons);
  yield takeLatest(deleteCoupons.type, handleDeleteCoupons);
};
