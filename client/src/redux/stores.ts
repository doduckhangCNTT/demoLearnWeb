import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./reducers/authSlice";
import { alertSlice } from "./reducers/alertSlice";

const store = configureStore({
  reducer: {
    alerts: alertSlice.reducer,
    authUser: authSlice.reducer,
  },
});

export default store;
