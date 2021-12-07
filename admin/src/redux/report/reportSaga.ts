import { takeLatest } from 'redux-saga/effects';

import { exportReport, getDashboardReport, } from './reportReducer';
import { handleExport, handleGetDashboardReport, } from './reportHanlder';

export default function* reportSagas() {
  yield takeLatest(getDashboardReport.type, handleGetDashboardReport);
  yield takeLatest(exportReport.type, handleExport);
};
