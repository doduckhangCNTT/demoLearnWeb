import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { deleteApi, getApi, postApi } from "../../../utils/FetchData";
import {
  AppDispatch,
  IConversation,
  IMessage,
  INewArrUserChatted,
  IUser,
} from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";
import { messageSlice } from "../../reducers/message/messageSlice";
import { IAuth } from "../../types/authType";

const messageAction = {
  createMessage: async (
    msg: IMessage,
    token: string,
    dispatch: AppDispatch
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("message", msg, access_token);
      console.log("Res: ", res);
      dispatch(messageSlice.actions.createMessage(res.data));
      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getConversations: async (authUser: IAuth, dispatch: AppDispatch) => {
    if (!authUser.access_token) return;
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("conversations", access_token);

      // console.log("Conversation: ", res);
      // Save info of Users chatted
      let newArr: INewArrUserChatted[] = [];
      // Filter users chatted with I
      res.data.conversations.forEach((conversation: IConversation) => {
        conversation.recipients.forEach((recipient) => {
          if (recipient._id !== authUser.user?._id) {
            newArr.push({
              ...recipient,
              text: conversation.text,
              media: conversation.media,
            });
          }
        });
      });

      // console.log({ res, array: newArr });
      dispatch(
        messageSlice.actions.getConversations({
          newArr: newArr,
          result: res.data.result,
        })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getMessages: async (id: string, authUser: IAuth, dispatch: AppDispatch) => {
    if (!authUser.access_token) return;
    const result = await checkTokenExp(authUser.access_token, dispatch);
    const access_token = result ? result : authUser.access_token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`messages/${id}`, access_token);

      const value = {
        sender: authUser,
        recipient: res.data.messages[0].recipient,
        idConversation: res.data.messages[0].conversation,
        messages: res.data.messages,
        result: res.data.result,
      };
      dispatch(messageSlice.actions.getMessages(value));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  updateMessage: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteMessage: async (id: string, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(`message/${id}`, access_token);

      dispatch(
        messageSlice.actions.deleteMessage({ id: res.data.message._id })
      );

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default messageAction;
