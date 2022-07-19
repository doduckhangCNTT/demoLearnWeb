import { createSlice } from "@reduxjs/toolkit";
import { IRoomChatList } from "../../../utils/Typescript";

const initialState = {
  rooms: [] as IRoomChatList[],
};

export const roomChatSlice = createSlice({
  name: "roomChat",
  initialState,
  reducers: {
    roomsChat: (state, action: any) => {
      if (state.rooms.every((room) => room._id !== action.payload[0]._id)) {
        return {
          ...state,
          rooms: [...state.rooms, ...action.payload],
        };
      }
    },
  },
});
