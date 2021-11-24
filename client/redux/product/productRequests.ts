import { AxiosResponse } from "axios";

import { Product, } from "models/product";
import { endpoints } from "constants/endpoints";
import axiosRequest from "services/axiosRequest";
import { ProductQuery } from "./productReducer";

export function getProductsRequest(query: ProductQuery | undefined): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.products, {
    params: query,
  });
}

export function getProduct(title: string): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.productDetail(title));
}
