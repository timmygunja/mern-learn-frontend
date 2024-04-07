import { createSlice } from "@reduxjs/toolkit";
import produce from "immer";
import { favoritesActions } from "./favorites-slice";
import env from "../env";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    loadedCartItems: [],
    totalPrice: 0,
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
    addToCartTotalCount(state) {
      state.totalCount += 1;
    },
    removeFromCartTotalCount(state) {
      state.totalCount -= 1;
    },
    unloggedAddToCart(state, action) {
      const existingItem = state.loadedCartItems.find(
        (cartItem) => cartItem.product.id === action.payload.product.id
      );

      state.totalPrice += action.payload.product.price;

      if (!existingItem) {
        state.loadedCartItems.push({
          product: action.payload.product,
          quantity: 1,
        });
        return;
      }

      existingItem.quantity += 1;
    },
    unloggedDeleteFromCart(state, action) {
      state.totalPrice -= action.payload.product.price;

      action.payload.product.quantity > 1
        ? (state.loadedCartItems.find(
            (cartItem) => cartItem.product.id === action.payload.product.id
          ).quantity -= 1)
        : (state.loadedCartItems = state.loadedCartItems.filter(
            (cartItem) => cartItem.product.id !== action.payload.product.id
          ));
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

      dispatch(cartActions.addToCartTotalCount());
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

      dispatch(cartActions.removeFromCartTotalCount());
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

      dispatch(cartActions.addToCartTotalCount());
      dispatch(cartActions.setCartChanged(true));
    } catch (err) {}
  };
};

export const cartActions = cartSlice.actions;

export default cartSlice;
