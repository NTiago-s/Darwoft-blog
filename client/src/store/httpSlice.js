import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpSlice = createSlice({
  name: "http",
  initialState: {
    data: null,
  },
  reducers: {
    httpGet: (state, action) => {
      state.data = action.payload;
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
