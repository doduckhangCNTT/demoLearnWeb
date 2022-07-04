import { RootState } from "../../utils/Typescript";

export const alertSelector = (state: RootState) => state;
export const authSelector = (state: RootState) => state;
export const categorySelector = (state: RootState) => state;
export const draftBlogSelector = (state: RootState) => state;

export const blogSelector = (state: RootState) => state;
export const blogsCategorySelector = (state: RootState) => state;
export const blogsUserSelector = (state: RootState) => state;

export const saveBlogUserSelector = (state: RootState) => state;
export const saveBlogsOfUserSelector = (state: RootState) => state;

export const commentBlogSelector = (state: RootState) => state;
export const replyCommentBlogSelector = (state: RootState) => state;

export const socketSelector = (state: RootState) => state;
