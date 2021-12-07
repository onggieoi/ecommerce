import { AxiosResponse } from "axios";

import { endpoints } from "../../helpers/constants";
import { DashboardReport } from "../../models/report";
import axiosRequest from "../../services/axiosRequest";
import { ReportQuery } from "./reportReducer";

export function getDashboardRequest(): Promise<AxiosResponse<DashboardReport>> {
  return axiosRequest.axios.get(endpoints.dashboardReport);
}

export function exportReportRequest(reportQuery: ReportQuery): Promise<AxiosResponse> {
  return axiosRequest.axios.get(endpoints.report, {
    responseType: 'blob',
    params: reportQuery,
  });
}