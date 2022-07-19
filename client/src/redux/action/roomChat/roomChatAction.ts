import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { getApi, postApi } from "../../../utils/FetchData";
import { AppDispatch, IRoomChat } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { roomChatSlice } from "../../reducers/roomChat/roomChatSlice";

const roomChatAction = {
  createRoomChat: async (
    room: IRoomChat,
    dispatch: AppDispatch,
    token: string
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("roomChat", room, access_token);

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getRoomChats: async (dispatch: AppDispatch, token: string) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("roomChats", access_token);
      console.log("Res: ", res);

      dispatch(roomChatSlice.actions.roomsChat(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateRoomChat: async (dispatch: AppDispatch, token: string) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteRoomChat: async (dispatch: AppDispatch, token: string) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default roomChatAction;
