import { checkTokenExp } from "../../../utils/CheckTokenExp";
import { postApi } from "../../../utils/FetchData";
import { AppDispatch, IReplyCommentBlog } from "../../../utils/Typescript";
import { alertSlice } from "../../reducers/alertSlice";

const replyCommentsBlogAction = {
  createCommentBlog: async (
    data: IReplyCommentBlog,
    token: string,
    dispatch: AppDispatch
  ) => {
    console.log("Data: ", data);
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("reply/comment", data, access_token);
      console.log("Res: ", res);
      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default replyCommentsBlogAction;
