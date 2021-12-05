import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { User } from "../../models/user";
import axiosRequest from "../../services/axiosRequest";


export function getUsersRequest(): Promise<AxiosResponse<User[]>> {
  return axiosRequest.axios.get(endpoints.user);
}
