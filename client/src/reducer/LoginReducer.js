import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticate: false,
  message: null,
  error: null,
};

export const loginReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOGIN_REQUEST", (state) => {
      state.loading = true;
      state.isAuthenticate = false;
    })
    .addCase("LOGIN_SUCCESS", (state, action) => {
      state.loading = false;
      state.isAuthenticate = true;
      state.message = action.payload;
    })
    .addCase("LOGIN_FAILURE", (state, action) => {
      state.isAuthenticate = false;
      state.loading = false;
      state.error = action.payload;
    })
    .addCase("CLEAR_ERROR", (state) => {
      state.error = null;
    })
    .addCase("CLEAR_MESSAGE", (state) => {
      state.message = null;
    });
});
