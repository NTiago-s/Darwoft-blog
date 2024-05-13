import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";
import Swal from "sweetalert2";
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
    const response = await http.put("users", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    if (response.status === 200) {
      Swal.fire({
        title: "Usuario modificado correctamente!",
        text: "",
        icon: "success",
        confirmButtonColor: "#22C55e",
        color: "#FFF",
        background: "#000",
        iconColor: "#22C55e",
      });
      dispatch(fetchProfileUsers());
    }
  } catch (error) {
    dispatch(httpPutFailure(error.message));
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: "Error al modificar usuario",
        text: error.response.data.message,
        icon: "error",
        confirmButtonColor: "#FF5C5C",
        color: "#FFF",
        background: "#000",
        iconColor: "#FF5C5C",
      });
    }
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

export const resetPassword = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put("users/resetpassword", data);
    dispatch(httpPutSuccess(response));
    console.log(response);
    if (response) {
      Swal.fire({
        title: "Cambios guardados correctamente",
        text: "Ya puedes cerrar esta pestaña",
        icon: "success",
        confirmButtonColor: "#22C55e",
        color: "#FFFFFF",
        background: "#000",
        iconColor: "#22C55e",
      });
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Error al guardar la contraseña",
        icon: "error",
        confirmButtonColor: "#FF22FF",
        color: "#FFFFFF",
        background: "#000",
        iconColor: "#FF22FF",
      });
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
