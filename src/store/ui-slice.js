import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    isLogged: false,
    user: {
      username: undefined,
      // password: undefined,
      token: undefined,
      tokenExpirationDate: undefined,
    },
  },
  reducers: {
    login(state, action) {
      const userData = action.payload.user;

      state.user.username = userData.username;
      // state.user.password = userData.password;
      state.user.token = userData.token;

      state.isLogged = true;

      const tokenExpirationDate = userData.tokenExpirationDate || new Date(new Date().getTime() + 1000 * 60 * 60) // 1000 * 60 * 60 * 12
      state.user.tokenExpirationDate = tokenExpirationDate;

      localStorage.setItem(
        "userData",
        JSON.stringify({
          userId: userData.id,
          username: userData.username,
          token: userData.token,
          tokenExpirationDate: tokenExpirationDate.toISOString(),
        })
      );
    },
    logout(state) {
      state.user.username = undefined;
      // state.user.password = undefined;
      state.user.token = undefined;
      state.user.tokenExpirationDate = undefined;

      state.isLogged = false;

      localStorage.removeItem("userData");
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
