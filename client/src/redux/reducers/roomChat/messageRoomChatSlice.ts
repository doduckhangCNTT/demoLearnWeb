import { createSlice } from "@reduxjs/toolkit";
import { IMessageRoom, INewArrUserChatted } from "../../../utils/Typescript";

import { IRoomChatList } from "../../../utils/Typescript";

const initialState = {
  room: {} as IRoomChatList,
  messages: [] as IMessageRoom[],
};

export const messageRoomSlice = createSlice({
  name: "messageRoom",
  initialState,
  reducers: {
    getMessages: (state, action: any) => {
      return {
        ...state,
        room: action.payload[0]?.roomChat,
        messages: action.payload,
      };
    },

    createMessage: (state, action: any) => {
      return {
        ...state,
        messages: [...state.messages, action.payload],
      };
    },

    deleteMessage: (state, action: any) => {
      return {
        ...state,
        messages: state.messages.filter(
          (message) => message._id !== action.payload.id
        ),
      };
    },
  },
});
