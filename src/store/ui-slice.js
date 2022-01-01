import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLogged: false,
    user: {
      username: undefined,
      password: undefined,
      token: undefined
    },
  },
  reducers: {
    login(state, action) {
      const userData = action.payload.user;

      state.user.username = userData.username;
      state.user.password = userData.password;
      state.user.token = userData.token;

      state.isLogged = true;
    },
    logout(state) {
      state.user.username = undefined;
      state.user.password = undefined;
      state.user.token = undefined;
      state.isLogged = false;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
