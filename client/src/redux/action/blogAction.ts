import { checkTokenExp } from "../../utils/CheckTokenExp";
import { getApi, postApi } from "../../utils/FetchData";
import { AppDispatch, IBlog } from "../../utils/Typescript";
import { alertSlice } from "../reducers/alertSlice";
import { blogSlice } from "../reducers/blogSlice";
import { categorySlice } from "../reducers/categorySlice";
import { IAuth } from "../types/authType";

const blogAction = {
  createBlog: async (
    blog: IBlog,
    token: string,
    dispatch: AppDispatch,
    authUser?: IAuth
  ) => {
    const result = await checkTokenExp(token, dispatch);
    const access_token = result ? result : token;
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      let formData = new FormData();
      formData.append("file", blog.thumbnail);
      const resImg = await postApi("upload", formData, access_token);
      const url = resImg.data.url;

      const newBlog = { ...blog, thumbnail: url };
      const res = await postApi("blog", newBlog, access_token);

      dispatch(blogSlice.actions.createBlog(res.data));
      dispatch(categorySlice.actions.createCategory(res.data));

      dispatch(alertSlice.actions.alertAdd({ success: res.data.msg }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },

  getBlogs: async (dispatch: AppDispatch) => {
    try {
      dispatch(alertSlice.actions.alertAdd({ loading: true }));

      const res = await getApi("blog");
      dispatch(blogSlice.actions.getBlog(res.data));

      dispatch(alertSlice.actions.alertAdd({ loading: false }));
    } catch (error: any) {
      dispatch(alertSlice.actions.alertAdd({ error: error.message }));
    }
  },
};

export default blogAction;
