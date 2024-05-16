/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { http } from "../services/http";
import Swal from "sweetalert2";

const httpCommentSlice = createSlice({
  name: "comment",
  initialState: {
    comments: [],
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
      state.comments = action.payload;
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
      state.comments = action.payload;
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
      state.comments = action.payload;
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
      state.comments = action.payload;
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
} = httpCommentSlice.actions;

export const fetchComments = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const comments = await http.get("comments");
    dispatch(httpGetSuccess(comments));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const createComment = (data) => async (dispatch) => {
  dispatch(httpPostStart());
  try {
    const response = await http.post("comments/create", data);
    dispatch(httpPostSuccess(response));
    console.log(response);
    if (response.status === 200) {
      dispatch(fetchComments());
      Swal.fire({
        title: "Comentario Creado Correctamente",
        icon: "success",
        confirmButtonColor: "#22C55e",
        color: "#FFFFFF",
        background: "#000",
        iconColor: "#22C55e",
      });
    }
  } catch (error) {
    dispatch(httpPostFailure(error.message));
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: "Error al crear el comentario",
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

export const updateComment = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put(`comments/update`, data);
    dispatch(httpPutSuccess(response.data));
    console.log(response);
    if (response.status === 200) {
      Swal.fire({
        title: "Comentario Modificado Correctamente",
        icon: "success",
        confirmButtonColor: "#22C55e",
        color: "#FFFFFF",
        background: "#000",
        iconColor: "#22C55e",
      });
      dispatch(fetchComments());
    }
  } catch (error) {
    dispatch(httpPutFailure(error.message));
    if (error.response && error.response.status === 400) {
      Swal.fire({
        title: "Error al modificar el comentario",
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

export const deleteComment = (id) => async (dispatch) => {
  dispatch(httpDeleteStart());
  try {
    const response = await http.deleteCreates("comments/delete", id);
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      dispatch(fetchComments());
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export default httpCommentSlice.reducer;
