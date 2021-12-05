import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { Account } from "../../models/account";
import { User } from "../../models/user";

export type UserRequestPayload<T> = {
  request: T,
  callback: Function;
}

type UserState = {
  loading: boolean;
  users: User[]
}

const initialState: UserState = {
  loading: false,
  users: [],
};

const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    getUsers: (state: UserState): UserState => ({
      ...state,
      loading: true,
    }),
    setUsers: (state: UserState, action: PayloadAction<User[]>) => {
      const users = action.payload;

      return {
        ...state,
        laoding: false,
        users,
      }
    },
  }
});

export const {
  getUsers, setUsers,
} = UserSlice.actions;

const UserReducer = UserSlice.reducer;

export default UserReducer;
