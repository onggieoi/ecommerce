import { configureStore, getDefaultMiddleware, combineReducers } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';

import productReducer from './product/productReducer';
import categoryReducer from './category/categoryReducer';
import orderReducer from './order/orderReducer';
import accountReducer from './account/accountReducer';
import couponReducer from './coupon/couponReducer';

import rootSaga from './sagas';

const reducer = combineReducers({
  productReducer,
  categoryReducer,
  orderReducer,
  accountReducer,
  couponReducer,
});

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer,
  middleware: [
    ...getDefaultMiddleware({
      thunk: false,
      serializableCheck: false,
    }),
    sagaMiddleware
  ],
});

rootSaga.map(saga => sagaMiddleware.run(saga))  // Register all sagas

// sagaMiddleware.run(watcherSaga);

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type RootDispatch = typeof store.dispatch;
