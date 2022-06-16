import { createSlice } from "@reduxjs/toolkit";
import { IComment } from "../../utils/Typescript";
import {
  IDeleteCommentBlogType,
  IDeleteSaveBlogType,
  IUpdateCommentBlogType,
} from "../types/blogType";
import { IUser } from "../../utils/Typescript";
import { ICommentType, IGetCommentType } from "../types/commentType";

const initialState: IComment[] = [];

export const commentBlogSlice = createSlice({
  name: "commentBlog",
  initialState,
  reducers: {
    createComment: (state, action: ICommentType) => {
      if (!(state as any)?.comments) {
        return;
      }

      return {
        ...state,
        comments: [action.payload, ...(state as any)?.comments],
        count: (state as any).comments.length + 1,
      };
    },

    getComments: (state, action: IGetCommentType) => {
      return action.payload;
    },

    updateComment: (state, action: IUpdateCommentBlogType) => {
      const result = (state as any).comments.map((item: { _id: string }) => {
        return action.payload._id === item._id
          ? { ...item, content: action.payload.body }
          : item;
      });

      return {
        ...state,
        comments: result,
      };
    },

    deleteComment: (state, action: IDeleteCommentBlogType) => {
      const comments = (state as any).comments.filter(
        (item: { _id: string }) => action.payload._id !== item._id
      );

      return {
        ...state,
        comments: comments,
        count: comments.length,
      };
    },
  },
});
