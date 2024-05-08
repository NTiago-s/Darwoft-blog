import { createSlice } from "@reduxjs/toolkit";

const httpSlice = createSlice({
  name: "http",
  initialState: {
    data: null,
  },
  reducers: {
    httpGet: (state, action) => {
      state.data = action.payload;
    },
    httpPut: (state, action) => {
      state.data = action.payload;
    },
    httpPost: (state, action) => {
      state.data = action.payload;
    },
    httpDelete: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { httpGet, httpPut, httpPost, httpDelete } = httpSlice.actions;
export default httpSlice.reducer;
