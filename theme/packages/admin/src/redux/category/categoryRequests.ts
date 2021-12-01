import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Category } from "../../models/category";
import axiosRequest from "../../services/axiosRequest";


export function getCategoriesRequest(): Promise<AxiosResponse<Category[]>> {
  return axiosRequest.axios.get(endpoints.categories);
}
