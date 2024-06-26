import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "ui",
  initialState: {
    readyToRender: false,
    isLoading: false,
    error: null,
    isLogged: undefined,
    user: {
      username: undefined,
      token: undefined,
      tokenExpirationDate: undefined,
    },
  },
  reducers: {
    // setReadyToRender(state, action) {
    //   state.isLoading = action.payload;
    // },
    setIsLoading(state, action) {
      state.isLoading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
    login(state, action) {
      const userData = action.payload.user;

      state.user.username = userData.username;
      state.user.token = userData.token;

      state.isLogged = true;

      const tokenExpirationDate =
        userData.tokenExpirationDate ||
        new Date(new Date().getTime() + 1000 * 60 * 60 * 12); // 1000 * 60 * 60 * 12 = 12 hours || 1000 * 5 = 5 seconds
      state.user.tokenExpirationDate = tokenExpirationDate.toISOString();

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
      state.user.username = null;
      state.user.token = null;
      state.user.tokenExpirationDate = null;

      state.isLogged = false;

      localStorage.removeItem("userData");
    },
  },
});

export const uiActions = uiSlice.actions;

export default uiSlice;
