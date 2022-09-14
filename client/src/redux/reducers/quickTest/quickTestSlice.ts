import { createSlice } from "@reduxjs/toolkit";
import { IQuickTest } from "../../../utils/Typescript";
import { IQuickTestType } from "../../types/quickTestType";

const initialState: IQuickTest[] = [];

export const quickTestSlice = createSlice({
  name: "quickTest",
  initialState,
  reducers: {
    createQuickTests: (state, action: IQuickTestType) => {
      return action.payload;
    },

    updateQuestionQuickTest: (state, action: any) => {
      // console.log("Action payload: ", action.payload);

      const value = state.map((item) => {
        if (item._id === action.payload.idQuickTest) {
          return {
            ...item,
            questions: action.payload.quickTest.questions,
          };
        } else {
          return item;
        }
      });

      return value;
    },
  },
});
