import { Request } from "express";
import { LoginTicket } from "google-auth-library";
import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  account: string;
  password: string;
  avatar: string;
  role: string;
  type: string;
  rf_token: string;
  _doc: object;
}

export interface IReqAuth extends Request {
  user?: IUser;
}

export interface INewUser {
  name: string;
  account: string;
  password: string;
}

export interface IDecodedToken {
  id?: string;
  newUser?: INewUser;
  iat: number;
  exp: number;
}

export interface IGooglePayLoad {
  email: string;
  email_verified: boolean;
  name: string;
  picture: string;
}
export interface IFaceBookPayLoad {
  id: string;
  email: string;
  name: string;
  picture: any;
}

export interface IUserParams {
  name: string;
  account: string;
  password: string;
  avatar?: string;
  type: string;
}
