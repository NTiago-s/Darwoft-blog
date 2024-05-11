import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpCommentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
    isLoading: false,
    error: null,
  },
  reducers: {
    httpGetStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpGetSuccess: (state, action) => {
      state.isLoading = false;
      state.comments = action.payload;
    },
    httpGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    httpPut: async (state, action) => {
      const response = await http.put(action.payload.string, {
        publicationId: action.payload.id,
        description: action.payload.description,
      });
      if (response.status === 200) {
        window.location.reload();
      }
      state.data = response;
    },
    httpPostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpPostSuccess: (state, action) => {
      state.isLoading = false;
      state.data = action.payload;
    },
    httpPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    httpDelete: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  httpGetStart,
  httpGetSuccess,
  httpGetFailure,
  httpPut,
  httpPostStart,
  httpPostSuccess,
  httpPostFailure,
} = httpCommentSlice.actions;

export const fetchComments = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const comments = await http.get("comments");
    dispatch(httpGetSuccess(comments));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const createComment = (formData) => async (dispatch) => {
  dispatch(httpPostStart());
  try {
    const response = await http.post("comments/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPostSuccess(response));
    if (response.status === 201) {
      dispatch(fetchComments());
    }
  } catch (error) {
    dispatch(httpPostFailure(error.message));
  }
};

export default httpCommentSlice.reducer;
