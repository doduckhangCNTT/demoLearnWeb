import { createSlice } from "@reduxjs/toolkit";
import { IBookMarkBlogUser } from "../../utils/Typescript";
import {
  IBlogType,
  IDeleteSaveBlogType,
  IGetBlogType,
} from "../types/blogType";

const initialState: IBookMarkBlogUser[] = [];

export const saveBlogSlice = createSlice({
  name: "saveBlog",
  initialState,
  reducers: {
    createBlog: (state, action: IBlogType) => {
      return [action.payload, ...state];
    },

    getBlog: (state, action: IGetBlogType) => {
      return action.payload;
    },

    deleteBlog: (state, action: IDeleteSaveBlogType) => {
      const blogs = state.filter((item) => action.payload._id !== item._id);

      return blogs;
    },
  },
});
