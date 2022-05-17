import { createSlice } from "@reduxjs/toolkit";
import {
  ICategory,
  ICreateCategoryType,
  IDeleteCategoryType,
  IGetCategoryType,
  IUpdateCategoryType,
} from "../types/categoryType";

const initialState: ICategory[] = [];

export const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    createCategory: (state, action: ICreateCategoryType) => {
      return [action.payload, ...state];
    },

    getCategories: (state, action: IGetCategoryType) => {
      return action.payload;
    },

    deleteCategory: (state, action: IDeleteCategoryType) => {
      return state.filter((item) => item._id !== action.payload);
    },

    updateCategory: (state, action: IUpdateCategoryType) => {
      return state.map((item) => {
        if (item._id === action.payload._id) {
          return { ...item, name: action.payload.name };
        }
        return item;
      });
    },
  },
});