import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import publicationReducer from "./httpPublication";
import commentReducer from "./httpComment";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    publication: publicationReducer,
    comment: commentReducer,
  },
});
