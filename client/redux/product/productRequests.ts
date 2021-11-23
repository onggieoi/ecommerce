import { AxiosResponse } from "axios";

import { Product, ProductQuery } from "models/product";
import { endpoints } from "constants/endpoints";
import axiosRequest from "services/axiosRequest";

export function getProductsRequest(query: ProductQuery | undefined): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.products, {
    params: query,
    // paramsSerializer: params => qs.stringify(params),
  });
}

export function getMoreProductsRequest(query: ProductQuery | undefined): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.products, {
    params: query,
    // paramsSerializer: params => qs.stringify(params),
  });
}
