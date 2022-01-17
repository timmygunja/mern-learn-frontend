import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice.js";
import cartSlice from "./cart-slice";
import sizesSlice from "./sizes-slice.js";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    sizes: sizesSlice.reducer,
  },
});

export default store;
