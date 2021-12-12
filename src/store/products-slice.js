import { createSlice } from "@reduxjs/toolkit";
import { useHttpClient } from "../shared/hooks/http-hook";


const productsSlice = createSlice({
  name: "products",
  initialState: {
    favourites: [],
    items: [],
      // {
      //   id: "1",
      //   name: "Product 1",
      //   firm: "Some firm 1",
      //   description:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //   price: 1000,
      //   isFavourite: false,
      // },
      // {
      //   id: "2",
      //   name: "Product 2",
      //   firm: "Some firm 2",
      //   description:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //   price: 2000,
      //   isFavourite: false,
      // },
      // {
      //   id: "3",
      //   name: "Product 3",
      //   firm: "Some firm 3",
      //   description:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //   price: 1500,
      //   isFavourite: false,
      // },
      // {
      //   id: "4",
      //   name: "Product 4",
      //   firm: "Some firm 4",
      //   description:
      //     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
      //   price: 2300,
      //   isFavourite: false,
      // },
    // ],
  },
  reducers: {
    addToFavourite(state, action) {
      const id = action.payload.id;
      const item = state.items.find((item) => item.id === id);
      item.isFavourite = !item.isFavourite;

      const existingItemInFavourites = state.favourites.find(
        (item) => item.id === id
      );

      if (!existingItemInFavourites) {
        state.favourites.push({
          id: item.id,
          name: item.name,
          firm: item.firm,
          price: item.price,
        });
      } else {
        state.favourites = state.favourites.filter((item) => item.id !== id);
      }
    },
    removeFromFavourite(state, action) {
      const id = action.payload.id;
      const item = state.items.find((item) => item.id === id);
      item.isFavourite = !item.isFavourite;

      state.favourites = state.favourites.filter((item) => item.id !== id);
    },
  },
});

export const productsActions = productsSlice.actions;

export default productsSlice;
