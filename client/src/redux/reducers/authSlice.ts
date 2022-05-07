import { createSlice } from "@reduxjs/toolkit";
import { validRegister } from "../../utils/Valid";

const initialState = {};

export default createSlice({
  name: "auths",
  initialState,
  reducers: {
    register: (state, action) => {
      const check = validRegister(action.payload);
      if (check.errLength > 0) {
        return;
      }
    },
  },
});
