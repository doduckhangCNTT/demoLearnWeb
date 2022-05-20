import {
  IBlog,
  IGetBlogsCategory,
  IGetBlogsUser,
} from "../../utils/Typescript";

export interface IBlogType {
  payload: IBlog;
}
export interface IGetBlogType {
  payload: IBlog[];
}
export interface IGetBlogsCategoryType {
  payload: IGetBlogsCategory;
}
export interface IGetBlogsUserType {
  payload: IGetBlogsUser;
}
