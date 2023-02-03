import { createSlice } from "@reduxjs/toolkit";
import env from "../env";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loadedProducts: undefined,
    changed: false,
  },
  reducers: {
    setLoadedProducts(state, action) {
      state.loadedProducts = action.payload;
    },
    setProductsChanged(state, action) {
      state.changed = action.payload;
    },
  },
});

export const loadProducts = (sendRequest) => {
  return async (dispatch) => {
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/products",
        env.BASE_URL + "/api/products",
        "GET",
        {
          "Content-Type": "application/json",
        }
      );

      dispatch(productsActions.setLoadedProducts(responseData.products));
    } catch (err) {}
  };
};

export const productsActions = productsSlice.actions;

export default productsSlice;
