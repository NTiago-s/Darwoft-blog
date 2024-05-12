import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/Auth.service";
import { http } from "../services/http";
import Swal from "sweetalert2";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    userProfile: null,
  },
  reducers: {
    login: (state, action) => {
      state.userProfile = action.payload;
    },
    setUserProfile: (state, action) => {
      state.userProfile = action.payload;
    },
    clearUserProfile: (state) => {
      state.userProfile = null;
    },
  },
});

export const { login, signup, logout, clearUserProfile } = authSlice.actions;

export const loginUser = (data) => async (dispatch) => {
  try {
    const response = await authService.login(data);
    if (response.status === 200) {
      dispatch(login(response));
      window.location.href = "/";
    }
  } catch (error) {
    Swal.fire({
      title: "Oops!",
      text: error.response.data.error,
      icon: "error",
      confirmButtonColor: "#FF22FF",
      color: "#FFF",
      background: "#000",
      iconColor: "#FF22FF",
    });
  }
};

export const signUpUser = (data) => async () => {
  try {
    const response = await authService.signup(data);
    if (response.status === 200) {
      Swal.fire({
        title: "Usuario creado correctamente!",
        text: "Revisa tu correo para verificar tu cuenta",
        icon: "success",
        confirmButtonColor: "#22C55e",
        color: "#FFF",
        background: "#000",
        iconColor: "#22C55e",
      });
      setTimeout(() => {
        window.location.href = "/";
      }, 2500);
    }
  } catch (error) {
    let errorMessage = error.response.data.error;
    Swal.fire({
      title: "Oops!",
      text: "Error: " + errorMessage,
      icon: "error",
      confirmButtonColor: "#FF22FF",
      color: "#FFF",
      background: "#000",
      iconColor: "#FF22FF",
    });
  }
};

export const logoutUser = () => async (dispatch) => {
  try {
    const response = await http.put("auth/logout");
    if (response.status === 200) {
      localStorage.removeItem("user");
      dispatch(clearUserProfile());
      window.location.href = "/";
    }
  } catch (error) {
    throw new Error();
  }
};

export default authSlice.reducer;
