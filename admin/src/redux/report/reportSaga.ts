import { takeLatest } from 'redux-saga/effects';

import { getDashboardReport, } from './reportReducer';
import { handleGetDashboardReport, } from './reportHanlder';

export default function* reportSagas() {
  yield takeLatest(getDashboardReport.type, handleGetDashboardReport);
};
