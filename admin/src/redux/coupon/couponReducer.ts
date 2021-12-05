import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coupon } from "../../models/order";

export type CouponRequest = {
  id?: string,
  discount: number,
  code: string,
  startdate: Date,
  endDate: Date,
}

export type CouponRequestPayload<T> = {
  request: T,
  callback: Function,
}

type CouponState = {
  loading: boolean;
  coupons: Coupon[],
}

const initialState: CouponState = {
  loading: false,
  coupons: [],
};

const CouponSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    upsertCoupon: (state: CouponState, action: PayloadAction<CouponRequestPayload<CouponRequest>>): CouponState => ({
      ...state,
      loading: true,
    }),
    deleteCoupons: (state: CouponState, action: PayloadAction<CouponRequestPayload<string[]>>): CouponState => ({
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
  }
});

export const {
  upsertCoupon, getCoupons, setCoupons, deleteCoupons,
} = CouponSlice.actions;

const CouponReducer = CouponSlice.reducer;

export default CouponReducer;
