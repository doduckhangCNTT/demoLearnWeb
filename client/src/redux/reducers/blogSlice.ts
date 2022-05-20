import { createSlice } from "@reduxjs/toolkit";
import { IBlog } from "../../utils/Typescript";
import { IBlogType, IGetBlogType } from "../types/blogType";

const initialState: IBlog[] = [];

export const blogSlice = createSlice({
  name: "blog",
  initialState,
  reducers: {
    createBlog: (state, action: IBlogType) => {
      return [action.payload, ...state];
    },

    getBlog: (state, action: IGetBlogType) => {
      return action.payload;
    },
  },
});
