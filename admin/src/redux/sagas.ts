import accountSaga from "./account/accountSaga";
import categorySaga from "./category/categorySaga";
import couponSagas from "./coupon/couponSaga";
import orderSaga from "./order/orderSaga";
import productSagas from "./product/productSaga";
import reportSagas from "./report/reportSaga";
import userSagas from "./user/userSaga";

export default [
  productSagas,
  categorySaga,
  accountSaga,
  orderSaga,
  userSagas,
  reportSagas,
  couponSagas,
];
