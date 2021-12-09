import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../../models/order";

export type CouponRequestPayload<T> = {
  request: T,
  callback: Function,
}

type CouponState = {
  loading: boolean;
  coupons: Coupon[],
  coupon?: Coupon,
}

const initialState: CouponState = {
  loading: false,
  coupons: [],
};

const CouponSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    getCoupon: (state: CouponState, action: PayloadAction<CouponRequestPayload<string>>): CouponState => ({
      ...state,
      loading: true,
    }),
    getCoupons: (state: CouponState): CouponState => ({
      ...state,
      loading: true,
    }),
    setCoupons: (state: CouponState, action: PayloadAction<Coupon[]>) => {
      const coupons = action.payload;

      return {
        ...state,
        loading: false,
        coupons,
      }
    },
    setCoupon: (state: CouponState, action: PayloadAction<Coupon>) => {
      const coupon = action.payload;

      return {
        ...state,
        loading: false,
        coupon,
      }
    },
  }
});

export const {
  getCoupon, getCoupons, setCoupons, setCoupon,
} = CouponSlice.actions;

const CouponReducer = CouponSlice.reducer;

export default CouponReducer;
