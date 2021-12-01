import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { Account } from "../../models/account";
import axiosRequest from "../../services/axiosRequest";
import { LoginRequest } from "./accountReducer";


export function handleLoginRequest(loginRequest: LoginRequest): Promise<AxiosResponse<Account>> {
  return axiosRequest.axios.post(endpoints.login, loginRequest);
}

export function getMeRequest(): Promise<AxiosResponse<Account>> {
  return axiosRequest.axios.get(endpoints.me);
}
