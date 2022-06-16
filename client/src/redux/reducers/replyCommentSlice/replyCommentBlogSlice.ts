import { createSlice } from "@reduxjs/toolkit";
import { IReplyCommentBlog } from "../../../utils/Typescript";
import {
  IGetReplyCommentBlogType,
  IReplyCommentBlogType,
} from "../../types/replyCommentType";

const initialState: IReplyCommentBlog[] = [];

export const replyCommentsBlogSlice = createSlice({
  name: "replyCommentBlog",
  initialState,
  reducers: {
    createComment: (state, action: IReplyCommentBlogType) => {
      if (!(state as any)?.comments) {
        return;
      }

      return {
        ...state,
        comments: [action.payload, ...(state as any)?.comments],
        count: (state as any).comments.length + 1,
      };
    },

    getComments: (state, action: IGetReplyCommentBlogType) => {
      return action.payload;
    },

    // updateComment: (state, action: IUpdateCommentBlogType) => {
    //   const result = (state as any).comments.map((item: { _id: string }) => {
    //     return action.payload._id === item._id
    //       ? { ...item, content: action.payload.body }
    //       : item;
    //   });

    //   return {
    //     ...state,
    //     comments: result,
    //   };
    // },

    // deleteComment: (state, action: IDeleteCommentBlogType) => {
    //   const comments = (state as any).comments.filter(
    //     (item: { _id: string }) => action.payload._id !== item._id
    //   );

    //   return {
    //     ...state,
    //     comments: comments,
    //     count: comments.length,
    //   };
    // },
  },
});
