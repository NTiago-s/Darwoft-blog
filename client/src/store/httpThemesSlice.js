import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpThemeSlice = createSlice({
  name: "theme",
  initialState: {
    themes: [],
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
      state.themes = action.payload;
    },
    httpGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    httpPutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpPutSuccess: (state, action) => {
      state.isLoading = false;
      state.themes = action.payload;
    },
    httpPutFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    httpPostStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpPostSuccess: (state, action) => {
      state.isLoading = false;
      state.themes = action.payload;
    },
    httpPostFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    httpDeleteStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpDeleteSuccess: (state, action) => {
      state.isLoading = false;
      state.themes = action.payload;
    },
    httpDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  httpGetStart,
  httpGetSuccess,
  httpGetFailure,
  httpPutStart,
  httpPutSuccess,
  httpPutFailure,
  httpPostStart,
  httpPostSuccess,
  httpPostFailure,
  httpDeleteStart,
  httpDeleteSuccess,
  httpDeleteFailure,
} = httpThemeSlice.actions;

export const fetchThemes = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const themes = await http.get("themes");
    dispatch(httpGetSuccess(themes));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const createTheme = (formData) => async (dispatch) => {
  dispatch(httpPostStart());
  try {
    const response = await http.post("themes/create", formData);
    dispatch(httpPostSuccess(response));
    if (response.status === 200) {
      dispatch(fetchThemes());
    }
  } catch (error) {
    dispatch(httpPostFailure(error.message));
  }
};

export const updateTheme = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put("themes/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPutSuccess(response));
    if (response.status === 200) {
      dispatch(fetchThemes());
    }
  } catch (error) {
    dispatch(httpPutFailure(error.message));
  }
};

export const deletetheme = (id) => async (dispatch) => {
  dispatch(httpDeleteStart());
  try {
    const response = await http.deleteCreates(`themes/delete`, id);
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      dispatch(fetchThemes());
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export default httpThemeSlice.reducer;
