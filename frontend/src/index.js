import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom" instead of "react-dom/client"
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
// import { store } from "./store";
import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./reducer";

export const server = "http://localhost:4000/api/v1";


const store = configureStore({
  reducer: rootReducer,
})

const AppWrapper = () => {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <AppWrapper />
  </React.StrictMode>
);

reportWebVitals();
