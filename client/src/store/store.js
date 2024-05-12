import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import publicationReducer from "./httpPublicationSlice";
import commentReducer from "./httpCommentSlice";
import themeReducer from "./httpThemesSlice";
import userReducer from "./httpUserSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    publication: publicationReducer,
    comment: commentReducer,
    theme: themeReducer,
    user: userReducer,
  },
});
