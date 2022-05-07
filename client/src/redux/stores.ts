import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import alertReducer from "./reducers/alertSlice";

const store = configureStore({
  reducer: {
    auths: authReducer.reducer,
    alerts: alertReducer.reducer,
  },
});

export default store;
