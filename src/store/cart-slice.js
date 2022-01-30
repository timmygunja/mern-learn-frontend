import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    totalCount: 0,
  },
  reducers: {
    setTotalCartCount(state, action) {
      state.totalCount = action.payload;
    },
    addToCart(state) {},
    removeFromCart(state) {},
  },
});

export const cartActions = cartSlice.actions;

export default cartSlice;
