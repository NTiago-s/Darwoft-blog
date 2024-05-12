import { createSlice, createAction } from "@reduxjs/toolkit";
import { http } from "../services/http";

export const filterPublicationsSuccess = createAction(
  "publication/filterSuccess"
);

const httpPublicationSlice = createSlice({
  name: "publication",
  initialState: {
    publications: [],
    filteredPublications: [],
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
      state.publications = action.payload;
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
      state.publications = action.payload;
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
      state.publications = action.payload;
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
      state.publications = action.payload;
    },
    httpDeleteFailure: (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(filterPublicationsSuccess, (state, action) => {
      state.filteredPublications = action.payload;
      state.publications = action.payload;
    });
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
} = httpPublicationSlice.actions;

export const fetchPublications = () => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const publications = await http.get("publications");
    dispatch(httpGetSuccess(publications));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const filterPublications = () => async (dispatch) => {
  const themeId = localStorage.getItem("filter");
  dispatch(httpGetStart());
  try {
    const publications = await http.get("publications");
    const filteredPublications = publications.publications.filter(
      (publication) => publication.themes.some((theme) => theme._id === themeId)
    );
    dispatch(httpGetSuccess({ publications: filteredPublications }));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const fetchPublication = (id) => async (dispatch) => {
  dispatch(httpGetStart());
  try {
    const publications = await http.get(`publications/${id}`);
    dispatch(httpGetSuccess(publications));
  } catch (error) {
    dispatch(httpGetFailure(error.message));
  }
};

export const createPublication = (formData) => async (dispatch) => {
  dispatch(httpPostStart());
  try {
    const response = await http.post("publications/create", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPostSuccess(response));
    if (response.status === 201) {
      dispatch(fetchPublications());
    }
  } catch (error) {
    dispatch(httpPostFailure(error.message));
  }
};

export const updatePublication = (data) => async (dispatch) => {
  dispatch(httpPutStart());
  try {
    const response = await http.put("publications/update", data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    dispatch(httpPutSuccess(response));
    if (response.status === 200) {
      dispatch(fetchPublications());
    }
  } catch (error) {
    dispatch(httpPutFailure(error.message));
  }
};

export const deletePublication = (id) => async (dispatch) => {
  dispatch(httpDeleteStart());
  try {
    const response = await http.deleteCreates(`publications/delete`, id);
    dispatch(httpDeleteSuccess(response));
    if (response.status === 200) {
      dispatch(fetchPublications());
    }
  } catch (error) {
    dispatch(httpDeleteFailure(error.message));
  }
};

export default httpPublicationSlice.reducer;
