import { call, put } from "@redux-saga/core/effects";
import { PayloadAction } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import FileSaver from 'file-saver';

import { getFileName } from "../../helpers";
import { Error } from "../../models/error";

import { ReportPayload, ReportQuery, setDashboardReport, setLoading, } from "./reportReducer";
import { exportReportRequest, getDashboardRequest } from "./reportRequest";

export function* handleGetDashboardReport() {
  try {
    const { data } = yield call(getDashboardRequest);

    yield put(setDashboardReport(data));

  } catch (error) {
    console.log(error);
  }
}

export function* handleExport(action: PayloadAction<ReportPayload<ReportQuery>>) {
  const { request, callback } = action.payload;
  try {
    const response: AxiosResponse = yield call(exportReportRequest, request);

    const filename = getFileName(response);

    FileSaver.saveAs(response.data, filename);

    callback('success', 'Exported')

  } catch (error) {
    const errorModel = error.response.data as Error;

    callback('error', errorModel.message);
  }

  yield put(setLoading(false));
}
