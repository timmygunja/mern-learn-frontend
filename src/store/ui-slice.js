import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLogged: false,
    user: {
      username: undefined,
      password: undefined,
    },
  },
  reducers: {
    login(state, action) {
      const userData = action.payload.user;

      state.user.username = userData.username;
      state.user.password = userData.password;

      state.isLogged = true;
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
