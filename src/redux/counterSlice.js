import { createSlice, current } from "@reduxjs/toolkit";
import { json, useNavigate } from "react-router-dom";
import colors, { layoutColors } from "../config/colors";

const initialState = {
  token: localStorage.getItem(process.env.REACT_APP_TOKEN_KEY) || null,
  isLoggedIn: !!localStorage.getItem(process.env.REACT_APP_TOKEN_KEY),
  user: JSON.parse(localStorage.getItem("user")) || null,
};

export const counterSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, { payload }) => {
      console.log(payload, "pay");
      localStorage.setItem(process.env.REACT_APP_TOKEN_KEY, payload.token);
      localStorage.setItem("user", JSON.stringify(payload.user));
      state.token = payload.token;
      state.isLoggedIn = true;
      state.user = payload.user;
    },
    logout: (state) => {
      state.token = null;
      state.userType = null;
      state.isLoggedIn = false;
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem(process.env.REACT_APP_TOKEN_KEY);
      localStorage.removeItem(process.env.REACT_APP_USER_TYPE);
    },
  },
});

// Action creators are generated for each case reducer function
export const { login, logout } = counterSlice.actions;

export default counterSlice.reducer;
