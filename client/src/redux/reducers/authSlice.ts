import { createSlice } from "@reduxjs/toolkit";
import { IAuth, IAuthType } from "../types/authType";

const initialState: IAuth = {};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    authUser: (state, action: IAuthType) => {
      return action.payload;
    },
  },
});
