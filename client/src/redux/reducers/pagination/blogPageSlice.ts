import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBlog } from "../../../utils/Typescript";

const initialState = {
  blogs: [] as IBlog[],
  totalCount: 0,
};

export const blogPageSlice = createSlice({
  name: "blogPage",
  initialState,
  reducers: {
    getBlogsPage: (state, action: any) => {
      return action.payload;
    },
    getBlogsPageSearch: (state, action: any) => {
      return action.payload;
    },
    updateBlogsPageSearch: (state, action: any) => {
      return {
        ...state,
        blogs: action.payload.blogs,
      };
    },
  },
});
