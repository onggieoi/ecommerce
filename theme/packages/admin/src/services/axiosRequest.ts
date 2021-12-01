import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

const config: AxiosRequestConfig = {
  baseURL: process.env.REACT_APP_BACKEND_API_URL ?? 'https://localhost:7293/api/',
}

class RequestService {
  public axios: AxiosInstance;

  constructor() {
    this.axios = axios.create(config);
  }

  public setAuthentication(accessToken: string) {
    this.axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
  }
}

export default new RequestService();
