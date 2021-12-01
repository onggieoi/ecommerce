import { call, put } from "@redux-saga/core/effects";

import { setCategories } from "./categoryReducer";
import { getCategoriesRequest } from "./categoryRequests";

export function* handleGetCategories() {
  try {
    const { data } = yield call(getCategoriesRequest);

    yield put(setCategories(data));

  } catch (error) {
    console.log(error);
  }
}
