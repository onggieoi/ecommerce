import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { DashboardReport } from "../../models/report";
import axiosRequest from "../../services/axiosRequest";

export function getDashboardRequest(): Promise<AxiosResponse<DashboardReport>> {
  return axiosRequest.axios.get(endpoints.dashboardReport);
}
