import { ChangeEvent, FormEvent } from "react";
import store from "../redux/stores";

export type InputChangedEvent = ChangeEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>;

export type FormSubmit = FormEvent<HTMLFormElement>;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export interface IUserLogin {
  account: string;
  password: string;
}
export interface IUserRegister extends IUserLogin {
  name: string;
  cf_password: string;
}

export interface IUser extends IUserLogin {
  avatar: string;
  createdAt: string;
  name: string;
  role: string;
  type: string;
  bio?: string;
  telephoneNumber?: string;
  updatedAt: string;
  _id: string;
  rf_token: string;
}

export interface IUserProfile extends IUserRegister {
  bio: string;
  telephoneNumber: string;
  avatar: File | string;
}

export interface IPayloadResetPass {
  password: string;
  cf_password: string;
}

export interface IPayloadResetPass_noCf {
  password: string;
}

export interface ICategory {
  _id?: string;
  name?: string;
  quality?: number;
  createdAt?: string;
  updatedAt?: string;
}

export interface IBlog {
  _id?: string;
  user: string | IUser;
  title: string;
  content: string;
  description: string;
  count?: number;
  // thumbnail: string | File;
  thumbnail: {
    url: string | File;
    public_id: string;
  };
  category: string;
  createdAt: string;
}

export interface IComment {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_of_userID: string;
  content: string;
  reply_comment: IComment[];
  reply_user?: IUser;
  comment_root?: string;
  createdAt: string;
}
export interface IReplyCommentBlog {
  _id?: string;
  user: IUser;
  blog_id: string;
  blog_of_userID: string;
  content: string;
  reply_comment: IComment[];
  reply_user?: IUser;
  originCommentHightestId?: string;
  rootComment_answeredId?: string;
  createdAt: string;
}

export interface ICommentBlog {
  _id: string;
  userComment: IUser;
  comments: IComment[];
  count: number;
}

export interface IBookMarkBlogUser extends IBlog {
  id_blog?: string;
  userSaved?: string | IUser;
  blogs?: IBookMarkBlogUser[];
}

export interface IBlogsSavedUser {
  _id: string;
  userSaved?: string | IUser;
  blogs: IBlog[];
  count: number;
}

export interface IGetBlogsCategory {
  _id: string;
  blogs: IBlog[];
  category: ICategory;
  total?: number;
  search?: string;
  count?: number;
}
export interface IGetBlogsUser extends IBlog {
  id: string;
  blogs: IBlog[];
  count?: number;
}

export interface IDeleteBlog {
  id: string;
}
export interface IDeleteSaveBlog {
  _id: string;
}
export interface IDeleteCommentBlog {
  _id: string;
}
export interface IUpdateCommentBlog {
  _id: string;
  body: string;
}
