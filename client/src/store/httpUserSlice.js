import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";

const httpUserSlice = createSlice({
  name: "user",
  initialState: {
    allUsers: [],
    userProfile: null,
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
      state.allUsers = action.payload;
    },
    httpGetFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
    httpPutStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    httpPutSuccess: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
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
      state.allUsers = action.payload;
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
      state.allUsers = action.payload;
    },
    httpDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
    searchUsersStart: (state) => {
      state.isLoading = true;
      state.error = null;
    },
    searchUsersSuccess: (state, action) => {
      state.isLoading = false;
      state.allUsers = action.payload;
    },
    searchUsersFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
});

export const {
  httpGetStart,
  httpGetSuccess,
  httpGetFailure,
  setUserProfile,
  clearUserProfile,
  httpPutStart,
  httpPutSuccess,
  httpPutFailure,
  httpPostStart,
  httpPostSuccess,
  httpPostFailure,
  httpDeleteStart,
  httpDeleteSuccess,
  httpDeleteFailure,
  searchUsersStart,
  searchUsersSuccess,
  searchUsersFailure,
} = httpUserSlice.actions;

export const fetchUsers = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const users = await http.get("users");
    dispatch(httpGetSuccess(users));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const searchUsers = (searchQuery) => async (dispatch) => {
  dispatch(searchUsersStart());
  try {
    const users = await http.get(`users/search?query=${searchQuery}`);
    dispatch(searchUsersSuccess({ users: users }));
  } catch (error) {
    dispatch(searchUsersFailure(error.message));
  }
};

export const fetchProfileUsers = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const userProfile = await http.get("users/profile");
    dispatch(setUserProfile(userProfile));
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

export const adminEdit = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put("users/editadmin", data);
    dispatch(httpPutSuccess(response));
    console.log(response);
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
    const response = await http.delete(`users/delete/${id}`);
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      dispatch(fetchUsers());
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export const logoutUser = () => async (dispatch) => {
  dispatch(httpDeleteStart());
  try {
    const response = await http.put("auth/logout");
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      localStorage.removeItem("user");
      dispatch(clearUserProfile());
      window.location.href = "/";
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export default httpUserSlice.reducer;
