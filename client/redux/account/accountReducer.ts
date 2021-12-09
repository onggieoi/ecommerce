import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Account, Address, Card, Contact } from "models/account";

import { Category } from "models/category";

export type LoginRequest = {
  userName: string,
  password: string,
}

export type UpsertRequest = {
  id?: string,
  name: string,
  contactNumber: string,
  addresses: Address[],
  cards: Card[],
  contacts: Contact[],
  userName?: string,
  password?: string,
}

export type LoginRequestPayload<T> = {
  request: T,
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
    upsertUser: (state: AccountState, action: PayloadAction<LoginRequestPayload<UpsertRequest>>): AccountState => ({
      ...state,
      loading: true,
    }),
    login: (state: AccountState, action: PayloadAction<LoginRequestPayload<LoginRequest>>): AccountState => ({
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
        loading: false,
        me,
      }
    },
  }
});

export const {
  login, setMe, getMe, upsertUser,
} = AccountSlice.actions;

const AccountReducer = AccountSlice.reducer;

export default AccountReducer;
