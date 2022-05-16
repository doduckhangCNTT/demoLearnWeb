import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { alertSlice } from "./reducers/alertSlice";
import { categorySlice } from "./reducers/categorySlice";
import { uploadSlice } from "./reducers/uploadSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    authUser: authSlice.reducer,
    categories: categorySlice.reducer,
    upload: uploadSlice.reducer,
  },
});

export default store;
