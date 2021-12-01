import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Product } from "../../models/product";
import axiosRequest from "../../services/axiosRequest";
import { ProductQuery, ProductRequest } from "./productReducer";

export function getProductsRequest(query: ProductQuery | undefined): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.products, {
    params: query,
  });
}

export function getProduct(title: string): Promise<AxiosResponse<Product>> {

  return axiosRequest.axios.get(endpoints.productDetail(title));
}

export function createProduct(request: ProductRequest): Promise<AxiosResponse<Product>> {
  let formData = new FormData();

  Object.keys(request).forEach(key => {
    formData.append(key, request[key]);

  });

  for (let file of request.galleryImages) {
    formData.append('galleryImages', file);
  }

  return axiosRequest.axios.post(endpoints.products, formData);
}
