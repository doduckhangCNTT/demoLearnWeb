import { checkTokenExp } from "../../utils/CheckTokenExp";
import { deleteApi, getApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IBlog } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { saveBlogSlice } from "../reducers/saveBlogSlice";
import { saveBlogUserSlice } from "../reducers/saveBlogUserSlice";

const saveBlogAction = {
  createBlog: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await postApi("bookmark/blog", blog, access_token);
      dispatch(saveBlogSlice.actions.createBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogs: async (token: string, dispatch: AppDispatch) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("bookmark/blogs", access_token);
      dispatch(saveBlogSlice.actions.getBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  deleteBlog: async (blog: IBlog, token: string, dispatch: AppDispatch) => {
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

export default saveBlogAction;
