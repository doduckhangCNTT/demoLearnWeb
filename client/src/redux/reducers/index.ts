import authReducer from "./authSlice";
import alertReducer from "./alertSlice";

export const CombineReducers = {
  reducer: {
    auths: authReducer,
    alerts: alertReducer,
  },
};
