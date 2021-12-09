import { AxiosResponse } from "axios";

import { endpoints } from "constants/endpoints";
import axiosRequest from "services/axiosRequest";
import { LoginRequest, UpsertRequest } from "./accountReducer";
import { Account } from "models/account";

export function handleLoginRequest(loginRequest: LoginRequest): Promise<AxiosResponse<Account>> {
  return axiosRequest.axios.post(endpoints.login, loginRequest);
}

export function getMeRequest(): Promise<AxiosResponse<Account>> {
  return axiosRequest.axios.get(endpoints.me);
}

export function upsertUserRequest(request: UpsertRequest): Promise<AxiosResponse<Account>> {
  return axiosRequest.axios.post(endpoints.user, request);
}
