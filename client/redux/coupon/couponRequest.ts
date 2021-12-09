import { AxiosResponse } from "axios";
import { endpoints } from "constants/endpoints";

import { Coupon } from "../../models/order";
import axiosRequest from "../../services/axiosRequest";

export function getCouponRequest(code: string): Promise<AxiosResponse<boolean>> {
  return axiosRequest.axios.get(endpoints.couponCode(code));
}

export function getCouponsRequest(): Promise<AxiosResponse<Coupon[]>> {
  return axiosRequest.axios.get(endpoints.coupon);
}
