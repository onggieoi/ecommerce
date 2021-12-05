import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Coupon } from "../../models/order";
import axiosRequest from "../../services/axiosRequest";
import { CouponRequest } from "./couponReducer";

export function upserCouponRequest(request: CouponRequest): Promise<AxiosResponse<boolean>> {
  return axiosRequest.axios.post(endpoints.coupon, request);
}

export function getCouponsRequest(): Promise<AxiosResponse<Coupon[]>> {
  return axiosRequest.axios.get(endpoints.coupon);
}

export function deleteCouponsRequest(request: string[]): Promise<AxiosResponse> {
  return axiosRequest.axios.delete(endpoints.coupon, {
    data: request,
  });
}
