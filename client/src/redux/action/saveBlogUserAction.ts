import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi } from "../../utils/FetchData";
import { AppDispatch, IBlog } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { saveBlogSlice } from "../reducers/saveBlogSlice";
import { saveBlogUserSlice } from "../reducers/saveBlogUserSlice";

const saveBlogUserAction = {
  getBlogUser: async (id: string, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi(`bookmark/user/blogs/${id}`, access_token);
      dispatch(saveBlogUserSlice.actions.getBlogsUser({ ...res.data, id }));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteBlogUser: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await deleteApi(`bookmark/blog/${blog._id}`, access_token);
      dispatch(saveBlogSlice.actions.deleteBlog(res.data.blog));
      dispatch(
        saveBlogUserSlice.actions.deleteBlog({ _id: res.data.blog._id })
      );

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default saveBlogUserAction;
