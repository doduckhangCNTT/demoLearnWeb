export interface ICategory {
  _id?: string;
  name?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateCategoryType {
  payload: ICategory;
}

export interface IGetCategoryType {
  payload: ICategory[];
}
export interface IDeleteCategoryType {
  payload: string;
}
export interface IUpdateCategoryType {
  payload: ICategory;
}
