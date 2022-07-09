import { createSlice } from "@reduxjs/toolkit";
import { INewArrUserChatted } from "../../../utils/Typescript";
import { IMessageType } from "../../types/messageType";

const initialState = {
  usersChatted: [] as INewArrUserChatted[],
  resultUsers: 0,
  data: [] as any[],
  firstLoad: false,
};

export const messageSlice = createSlice({
  name: "message",
  initialState,
  reducers: {
    createMessage: (state, action: any) => {
      return {
        ...state,
        data: {
          ...state.data,
          messages: [...(state.data as any).messages, action.payload],
        },
      };
    },

    getConversations: (state, action: IMessageType) => {
      return {
        ...state,
        usersChatted: action.payload.newArr,
        resultUsers: action.payload.result,
        firstLoad: true,
      };
    },

    getMessages: (state, action: any) => {
      return {
        ...state,
        data: action.payload,
      };
    },

    deleteMessage: (state, action) => {
      return {
        ...state,
        data: {
          ...state.data,
          messages: (state.data as any).messages.filter(
            (msg: { _id: string }) => msg._id !== action.payload.id
          ),
        },
      };
    },
  },
});
