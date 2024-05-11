import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import publicationReducer from "./httpPublicationSlice";
import commentReducer from "./httpCommentSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    publication: publicationReducer,
    comment: commentReducer,
  },
});
