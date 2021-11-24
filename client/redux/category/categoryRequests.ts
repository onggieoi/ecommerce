import { AxiosResponse } from "axios";

import { endpoints } from "constants/endpoints";
import axiosRequest from "services/axiosRequest";
import { Category } from "models/category";

export function getCategoriesRequest(): Promise<AxiosResponse<Category[]>> {
  return axiosRequest.axios.get(endpoints.categories);
}
