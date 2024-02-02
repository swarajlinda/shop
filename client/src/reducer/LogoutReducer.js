import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  isAuthenticate: false,
  user: null,
  message: null,
  error: null,
};

export const logoutReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LOGOUT_REQUEST", (state) => {
      state.loading = true;
    })
    .addCase("LOGOUT_SUCCESS", (state, action) => {
      state.loading = false;
      state.isAuthenticate = false;
      state.user = null;
      state.message = action.payload;
    })
    .addCase("LOGOUT_FAILURE", (state, action) => {
      state.isAuthenticate = false;
      state.loading = false;
      state.error = action.payload;
    });
});
