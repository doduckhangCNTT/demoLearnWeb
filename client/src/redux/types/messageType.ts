import { IMessage, INewArrUserChatted } from "../../utils/Typescript";

export interface IMessageType {
  payload: { newArr: INewArrUserChatted[]; result: number };
}

export interface IGetMessageType {
  payload: {
    value: any;
    messages: IMessage[];
    result: number;
  };
}
