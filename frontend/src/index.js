import React, { createContext, useState } from "react";
import ReactDOM from "react-dom/client"; // Import from "react-dom" instead of "react-dom/client"
import "./index.css";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/index"

export const server = "http://localhost:4000/api/v1";




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

