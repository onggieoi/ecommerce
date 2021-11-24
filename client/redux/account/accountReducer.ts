import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account } from "models/account";

import { Category } from "models/category";

export type LoginRequest = {
  userName: string,
  password: string,
}

export type LoginRequestPayload = {
  request: LoginRequest,
  callback: Function;
}

type AccountState = {
  loading: boolean;
  me?: Account;
}

const initialState: AccountState = {
  loading: false,
};

const AccountSlice = createSlice({
  name: 'account',
  initialState,
  reducers: {
    login: (state: AccountState, action: PayloadAction<LoginRequestPayload>): AccountState => ({
      ...state,
      loading: true,
    }),
    getMe: (state: AccountState): AccountState => ({
      ...state,
      loading: true,
    }),
    setMe: (state: AccountState, action: PayloadAction<Account>) => {
      const me = action.payload;

      return {
        ...state,
        laoding: false,
        me,
      }
    },
  }
});

export const {
  login, setMe, getMe,
} = AccountSlice.actions;

const AccountReducer = AccountSlice.reducer;

export default AccountReducer;
