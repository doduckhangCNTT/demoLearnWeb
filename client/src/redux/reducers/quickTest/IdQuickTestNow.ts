import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  id: "",
};

interface IIdQuickTestNow {
  payload: {
    id: string;
  };
}

export const idQuickTestSlice = createSlice({
  name: "id_QuickTestNow",
  initialState,
  reducers: {
    createIdQuickTestNow: (state, action: IIdQuickTestNow) => {
      return { ...state, id: action.payload.id };
    },
  },
});
