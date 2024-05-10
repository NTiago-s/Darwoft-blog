import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpPublicationSlice = createSlice({
  name: "http",
  initialState: {
    data: null,
  },
  reducers: {
    httpPublicationGet: (state, action) => {
      state.data = action.payload;
    },
    httpPublicationPut: async (state, action) => {
      const response = await http.put(action.payload.string, {
        publicationId: action.payload.id,
        description: action.payload.description,
      });
      if (response.status === 200) {
        window.location.reload();
      }
      state.data = response;
    },
    httpPublicationPost: (state, action) => {
      state.data = action.payload;
    },
    httpPublicationDelete: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { httpGet, httpPut, httpPost, httpDelete } =
  httpPublicationSlice.actions;
export default httpPublicationSlice.reducer;
