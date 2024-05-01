import axios from "axios";
import Swal from "sweetalert2";

const BASE_URL = import.meta.env.VITE_ENDPOINT;

export const authService = {
  login: async (data) => {
    const response = await axios.put(BASE_URL + "/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
  },

  logout: async (data) => {
    const response = await fetch(BASE_URL + "/auth/logout", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token: data }),
    });
    if (response.ok) {
      localStorage.removeItem("user");
    } else {
      Swal.fire({
        title: "Oops!",
        text: "Error al cerrar Sesion",
        icon: "error",
        confirmButtonColor: "#FF22FF",
        color: "#FFF",
        background: "#000",
        iconColor: "#FF22FF",
      });
    }
  },

  signup: (data) => {
    return axios.post(BASE_URL + "/auth/register/client", data);
  },

  getCurrentUser: () => {
    return JSON.parse(localStorage.getItem("user"));
  },

  isAuthorized: () => {
    return localStorage.getItem("user") !== null;
  },

  userRole: () => {
    const user = localStorage.getItem("user");
    const parsedUser = user ? JSON.parse(user) : null;
    return parsedUser?.role;
  },
};
