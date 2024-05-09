import { createSlice } from "@reduxjs/toolkit";
import { authService } from "../services/Auth.service";
import Swal from "sweetalert2";
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
  },
  reducers: {
    login: async (state, data) => {
      const user = await authService.login(data.payload);
      state.user = user;
    },
    singup: async (state, data) => {
      const user = await authService.signup(data.payload);
      try {
        if (user.status === 200) {
          Swal.fire({
            title: "Usuario creado correctamente!",
            text: "Revisa tu correo para verificar tu cuenta",
            icon: "success",
            confirmButtonColor: "#22C55e",
            color: "#FFF",
            background: "#000",
            iconColor: "#22C55e",
          });
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
      state.user = user;
    },
  },
});

export const { login, singup } = authSlice.actions;
export default authSlice.reducer;
