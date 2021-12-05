import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DashboardReport } from "../../models/report";

type ReportState = {
  loading: boolean;
  data?: DashboardReport;
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
  }
});

export const {
  getDashboardReport, setDashboardReport,
} = ReportSlice.actions;

const ReportReducer = ReportSlice.reducer;

export default ReportReducer;
