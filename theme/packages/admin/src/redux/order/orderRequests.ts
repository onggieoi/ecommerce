import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Order } from "../../models/order";
import axiosRequest from "../../services/axiosRequest";
import { OrderRequest } from "./orderReducer";



export function createOrderRequest(request: OrderRequest): Promise<AxiosResponse<Order>> {
  return axiosRequest.axios.post(endpoints.order, request);
}

export function getOrderDetail(orderId: string): Promise<AxiosResponse<Order>> {
  return axiosRequest.axios.get(endpoints.getOrderDetail(orderId));
}
