import { createSlice } from "@reduxjs/toolkit";
import { favoritesActions } from "./favorites-slice";
import env from "../env";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loadedCartItems: undefined,
    totalPrice: undefined,
    totalCount: 0,
    changed: false,
  },
  reducers: {
    setCartChanged(state, action) {
      state.changed = action.payload;
    },
    setLoadedCartItems(state, action) {
      state.loadedCartItems = action.payload;
    },
    setTotalCartCount(state, action) {
      state.totalCount = action.payload;
    },
    setTotalCartPrice(state, action) {
      state.totalPrice = action.payload;
    },
    addToCart(state) {
      state.totalCount += 1;
    },
    removeFromCart(state) {
      state.totalCount -= 1;
    },
  },
});

export const loadCartItems = (sendRequest, user) => {
  return async (dispatch) => {
    try {
      // console.log("default username: ", user.username);
      // console.log("default token: ", user.token);

      // let encodedUsername = unescape(encodeURIComponent(user.username));
      // let encodedToken = unescape(encodeURIComponent(user.token));

      // console.log("username encoded: ", encodedUsername);
      // console.log("token encoded: ", encodedToken);

      // let decodedUsername = decodeURIComponent(escape(encodedUsername));
      // let decodedToken = decodeURIComponent(escape(encodedToken));

      // console.log("username decoded: ", decodedUsername);
      // console.log("token decoded: ", decodedToken);

      const responseData = await sendRequest(
        // "http://localhost:5000/api/cart",
        env.BASE_URL + "/api/cart",
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      // console.log("here", responseData.cartItems);

      responseData.cartItems.length > 0
        ? dispatch(cartActions.setLoadedCartItems(responseData.cartItems))
        : dispatch(cartActions.setLoadedCartItems([]));

      dispatch(cartActions.setTotalCartPrice(responseData.cartTotalPrice));
    } catch (error) {}
  };
};

export const getCartLength = (sendRequest, user) => {
  return async (dispatch) => {
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/cart/getCartLength",
        env.BASE_URL + "/api/cart/getCartLength",
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      dispatch(cartActions.setTotalCartCount(responseData.cartLength));
    } catch (err) {}
  };
};

export const increaseCartItemQuantity = (sendRequest, user, productId) => {
  return async (dispatch) => {
    try {
      await sendRequest(
        // `http://localhost:5000/api/cart/${productId}`,
        env.BASE_URL + `/api/cart/${productId}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      dispatch(cartActions.addToCart());
      dispatch(cartActions.setCartChanged(true));
    } catch (err) {}
  };
};

export const decreaseCartItemQuantity = (sendRequest, user, cartItemId) => {
  return async (dispatch) => {
    try {
      await sendRequest(
        // `http://localhost:5000/api/cart/${cartItemId}`,
        env.BASE_URL + `/api/cart/${cartItemId}`,
        "DELETE",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      dispatch(cartActions.removeFromCart());
      dispatch(cartActions.setCartChanged(true));
    } catch (err) {}
  };
};

export const addProductToCart = (sendRequest, user, productId) => {
  return async (dispatch) => {
    try {
      await sendRequest(
        // `http://localhost:5000/api/cart/${productId}`,
        env.BASE_URL + `/api/cart/${productId}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      dispatch(cartActions.addToCart());
      dispatch(cartActions.setCartChanged(true));
    } catch (err) {}
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
