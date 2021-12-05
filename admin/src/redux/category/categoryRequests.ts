import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Category } from "../../models/category";
import axiosRequest from "../../services/axiosRequest";
import { CategoryRequest } from "./categoryReducer";


export function getCategoriesRequest(): Promise<AxiosResponse<Category[]>> {
  return axiosRequest.axios.get(endpoints.categories);
}

export function upsertCategoryRequest(request: CategoryRequest): Promise<AxiosResponse<Category>> {
  return axiosRequest.axios.post(endpoints.categories, request);
}

export function deleteCategoryRequest(request: string[]): Promise<AxiosResponse> {
  return axiosRequest.axios.delete(endpoints.categories, {
    data: request,
  });
}
