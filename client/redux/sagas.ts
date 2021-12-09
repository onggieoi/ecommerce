import accountSaga from "./account/accountSaga";
import categorySaga from "./category/categorySaga";
import couponSagas from "./coupon/couponSaga";
import orderSaga from "./order/orderSaga";
import productSagas from "./product/productSaga";

export default [
  productSagas,
  categorySaga,
  accountSaga,
  orderSaga,
  couponSagas
];
