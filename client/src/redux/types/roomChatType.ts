import { IUser } from "../../utils/Typescript";

export interface IRoomChat {
  admin: IUser[] | string[];
  media: string[];
  name: string;
  text: string;
  users: IUser[];
  _id: string;
}

export interface IAddUserRoomChat {
  payload: { user: IUser; usersInRoom: IRoomChat; adminsInRoom?: IRoomChat };
}
export interface IDeleteUserRoomChat {
  payload: {
    users: IUser[];
    usersInRoom: IRoomChat;
  };
}
export interface IDeleteUserAdminRoomChat {
  payload: {
    adminsInRoom: IRoomChat;
    admin: IUser[];
  };
}
