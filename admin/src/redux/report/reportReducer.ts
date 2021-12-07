import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DashboardReport } from "../../models/report";

type ReportState = {
  loading: boolean;
  data?: DashboardReport;
}

export type ReportPayload<T> = {
  request: T,
  callback: Function,
}

export type ReportQuery = {
  createdFrom: Date;
  createdTo: Date;
}

const initialState: ReportState = {
  loading: false,
};

const ReportSlice = createSlice({
  name: 'report',
  initialState,
  reducers: {
    getDashboardReport: (state: ReportState): ReportState => {

      return {
        ...state,
        loading: true,
      }
    },
    setDashboardReport: (state: ReportState, action: PayloadAction<DashboardReport>) => {
      const data = action.payload;

      return {
        ...state,
        loading: false,
        data,
      }
    },
    exportReport: (state: ReportState, action: PayloadAction<ReportPayload<ReportQuery>>) => ({
      ...state,
      loading: true,
    }),
    setLoading: (state: ReportState, action: PayloadAction<boolean>) => {
      const loading = action.payload;

      return {
        ...state,
        loading,
      }
    },
  }
});

export const {
  getDashboardReport, setDashboardReport, exportReport, setLoading,
} = ReportSlice.actions;

const ReportReducer = ReportSlice.reducer;

export default ReportReducer;
