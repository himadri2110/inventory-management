import React from "react";
import ReactDOM from "react-dom/client";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import "./index.css";
import App from "./App";
import productSlice from "./slices/ProductSlice";
import authSlice from "./slices/authSlice";

const store = configureStore({
  reducer: {
    authSlice,
    productSlice,
    devTools: process.env.NODE_ENV !== "development" ? false : true,
  },
});

// export type RootState = ReturnType<typeof store.getState>;

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
