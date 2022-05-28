import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { alertSlice } from "./reducers/alertSlice";
import { categorySlice } from "./reducers/categorySlice";
import { uploadSlice } from "./reducers/uploadSlice";
import { blogSlice } from "./reducers/blogSlice";
import { blogsCategorySlice } from "./reducers/blogCategorySlice";
import { blogsUserSlice } from "./reducers/blogsUserSlice";
import { draftBlogSlice } from "./reducers/draftBlogSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    authUser: authSlice.reducer,
    categories: categorySlice.reducer,
    upload: uploadSlice.reducer,
    blogs: blogSlice.reducer,
    draftBlogs: draftBlogSlice.reducer,
    blogsCategory: blogsCategorySlice.reducer,
    blogsUser: blogsUserSlice.reducer,
  },
});

export default store;
