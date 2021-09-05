import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice.js";
import cartSlice from "./cart-slice";
import sizesSlice from "./sizes-slice.js";
import productsSlice from "./products-slice.js";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    sizes: sizesSlice.reducer,
    products: productsSlice.reducer,
  },
});

export default store;
