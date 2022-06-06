import { createSlice } from "@reduxjs/toolkit";
import { IDeleteSaveBlogType } from "../types/blogType";
import { IBookMarkType, IBookMarkUser } from "../types/bookMarkTypes";

const initialState: IBookMarkUser = {
  blogsSave: [],
  count: 0,
  id: "",
};

export const saveBlogUserSlice = createSlice({
  name: "saveBlogUser",
  initialState,
  reducers: {
    getBlogsUser: (state, action: IBookMarkType) => {
      return action.payload;
    },

    deleteBlog: (state, action: IDeleteSaveBlogType) => {
      const result = state.blogsSave.filter(
        (item) => item._id !== action.payload._id
      );

      return { ...state, blogsSave: result };
    },
  },
});
