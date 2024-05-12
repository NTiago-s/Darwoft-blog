/* eslint-disable no-useless-catch */
import axios from "axios";
import authHeader from "../services/AuthHeader";

export const BASE_URL = import.meta.env.VITE_ENDPOINT;

const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: authHeader(),
});

axiosPrivate.interceptors.request.use(function (config) {
  const token = JSON.parse(localStorage.getItem("user"));
  if (config.headers !== undefined) {
    config.headers.Authorization = token ? `${token.accessToken}` : "";
  }
  return config;
});

const headers = {
  "Content-Type": "application/json",
};

const get = async (url) => {
  try {
    const response = await axiosPrivate.get(`${BASE_URL}/${url}`, {
      headers,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

const post = async (url, body, customHeaders) => {
  const response = await axiosPrivate.post(`${BASE_URL}/${url}`, body, {
    method: "POST",
    headers: customHeaders ? customHeaders : headers,
  });
  return response;
};

const put = async (url, body, customHeaders) => {
  try {
    const response = await axiosPrivate.put(`${BASE_URL}/${url}`, body, {
      method: "PUT",
      headers: customHeaders ? customHeaders : headers,
    });
    console.log(response);
    if (response.data.user && response.data.user.profileImage) {
      const currentUser = JSON.parse(localStorage.getItem("user"));
      currentUser.profileImage = response.data.profileImage;
      localStorage.setItem("user", JSON.stringify(currentUser));
    }
    return response;
  } catch (error) {
    console.error("Error al realizar la solicitud:", error);
    if (error.response) {
      console.error("Respuesta del servidor:", error.response.data);
    }
    throw error;
  }
};

const _delete = async (url) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "DELETE",
    headers,
  });
  return response;
};

const _deleteCreates = async (url, Id) => {
  const response = await fetch(`${BASE_URL}/${url}`, {
    method: "DELETE",
    body: JSON.stringify({ Id }),
    headers,
  });
  return response;
};

export const http = {
  get,
  post,
  put,
  delete: _delete,
  deleteCreates: _deleteCreates,
};

export default axiosPrivate;
