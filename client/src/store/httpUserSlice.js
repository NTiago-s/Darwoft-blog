import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpUserSlice = createSlice({
  name: "User",
  initialState: {
    Users: [],
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
      state.Users = action.payload;
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
      state.data = action.payload;
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
      state.data = action.payload;
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
      state.data = action.payload;
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
} = httpUserSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const users = await http.get("Users");
    dispatch(httpGetSuccess(users));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const createUser = (formData) => async (dispatch) => {
  dispatch(httpPostStart());
  try {
    const response = await http.post("users/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPostSuccess(response));
    if (response.status === 201) {
      dispatch(fetchUsers());
    }
  } catch (error) {
    dispatch(httpPostFailure(error.message));
  }
};

export const updateUser = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put("users/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPutSuccess(response));
    if (response.status === 200) {
      dispatch(fetchUsers());
    }
  } catch (error) {
    dispatch(httpPutFailure(error.message));
  }
};

export const deleteUser = (id) => async (dispatch) => {
  dispatch(httpDeleteStart());
  try {
    const response = await http.deleteCreates(`users/delete`, id);
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      dispatch(fetchUsers());
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export default httpUserSlice.reducer;
