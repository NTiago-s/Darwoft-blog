import axios from "axios";
const BASE_URL = import.meta.env.VITE_ENDPOINT;

export const authService = {
  login: async (data) => {
    const response = await axios.put(BASE_URL + "/auth/login", data);
    if (response.data.accessToken) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response;
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
