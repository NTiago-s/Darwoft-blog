import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import httpReducer from "./httpSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    http: httpReducer,
  },
});
