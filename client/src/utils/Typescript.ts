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
  user: string;
  title: string;
  content: string;
  description: string;
  count?: number;
  thumbnail: string | File;
  category: string;
  createdAt: string;
}

export interface IGetBlogsCategory {
  id: string;
  blogs: IBlog[];
  total?: number;
  search?: string;
  count?: number;
}
export interface IGetBlogsUser extends IBlog {
  id: string;
  blogs: IBlog[];
  total?: number;
  search?: string;
  count?: number;
}
