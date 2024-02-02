import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticate: false,
  user: null,
  error: null,
};

export const loadUserReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOAD_USER_REQUEST", (state) => {
      state.loading = true; // Set loading to true during user loading request
      state.isAuthenticate = false;
    })
    .addCase("LOAD_USER_SUCCESS", (state, action) => {
      state.loading = false;
      state.isAuthenticate = true;
      state.user = action.payload;
    })
    .addCase("LOAD_USER_FAILURE", (state, action) => {
      state.isAuthenticate = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("CLEAR_ERROR", (state) => {
      state.error = null;
    });
});
