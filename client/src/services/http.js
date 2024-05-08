/* eslint-disable no-useless-catch */
import axios from "axios";
import authHeader from "./AuthHeader";

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

const post = async (url, body) => {
  const response = await axiosPrivate.post(`${BASE_URL}/${url}`, {
    method: "POST",
    body,
    headers,
  });
  return response;
};

const put = async (url, body) => {
  const response = await axiosPrivate.put(`${BASE_URL}/${url}`, {
    method: "PUT",
    body,
    headers,
  });
  return response;
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
