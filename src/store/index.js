import { configureStore } from "@reduxjs/toolkit";

import uiSlice from "./ui-slice.js";
import cartSlice from "./cart-slice";
import productsSlice from "./products-slice.js";
import favoritesSlice from "./favorites-slice.js";

const store = configureStore({
  reducer: {
    ui: uiSlice.reducer,
    cart: cartSlice.reducer,
    products: productsSlice.reducer,
    favorites: favoritesSlice.reducer,
  },
});

export default store;
