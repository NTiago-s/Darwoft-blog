import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpSlice = createSlice({
  name: "http",
  initialState: {
    data: null,
    publications: [],
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
      state.publications = action.payload;
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
} = httpSlice.actions;

export default httpSlice.reducer;
