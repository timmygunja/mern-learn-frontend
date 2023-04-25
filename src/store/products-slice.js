import { createSlice } from "@reduxjs/toolkit";
import env from "../env";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    loadedProducts: undefined,
    changed: false,
    filteredProducts: undefined,
    filterChanged: false
  },
  reducers: {
    setLoadedProducts(state, action) {
      state.loadedProducts = action.payload;
    },
    setProductsChanged(state, action) {
      state.changed = action.payload;
    },
    setFilteredProducts(state, action) {
      state.filteredProducts = action.payload;
    },
    setFilterChanged(state, action) {
      state.filterChanged = action.payload;
    },
  },
});

export const loadProducts = (sendRequest, filter) => {
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

export const loadFilteredProducts = (sendRequest, filter) => {
  return async (dispatch) => {
    try {
      const responseData = await sendRequest(
        env.BASE_URL + "/api/products",
        "GET",
        {
          "Content-Type": "application/json",
          "productfilter": filter,
        }
      );

      dispatch(productsActions.setFilteredProducts(responseData.products));
    } catch (err) {}
  };
};

export const productsActions = productsSlice.actions;

export default productsSlice;
