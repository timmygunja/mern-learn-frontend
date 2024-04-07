import { createSlice } from "@reduxjs/toolkit";
import env from "../env";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    loadedFavorites: [],
    loadedFavoritesIds: [],
    changed: false,
  },
  reducers: {
    setFavoritesChanged(state, action) {
      state.changed = action.payload;
    },
    setloadedFavorites(state, action) {
      state.loadedFavorites = action.payload;
    },
    setloadedFavoritesIds(state, action) {
      state.loadedFavoritesIds = action.payload;
    },
    addToFavoritesIdsReducer(state, action) {
      state.loadedFavoritesIds.push(action.payload);
    },
    // push doesn't need variable reassignment, but filter does...
    deleteFromFavoritesIdsReducer(state, action) {
      state.loadedFavoritesIds = state.loadedFavoritesIds.filter(
        (id) => id !== action.payload
      );
    },
    unloggedAddToFavorites(state, action) {
      state.loadedFavorites = [...state.loadedFavorites, action.payload];
    },
    unloggedDeleteFromFavorites(state, action) {
      state.loadedFavorites = state.loadedFavorites.filter(
        (product) => product.id !== action.payload
      );
    },
  },
});

export const loadFavorites = (sendRequest, user) => {
  return async (dispatch) => {
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/favorites",
        env.BASE_URL + "/api/favorites",
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      responseData.favItems.length > 0
        ? dispatch(favoritesActions.setloadedFavorites(responseData.favItems))
        : dispatch(favoritesActions.setloadedFavorites([]));
    } catch (err) {}
  };
};

export const loadFavoritesIds = (sendRequest, user) => {
  return async (dispatch) => {
    try {
      const responseData = await sendRequest(
        // "http://localhost:5000/api/favorites/ids",
        env.BASE_URL + "/api/favorites/ids",
        "GET",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      responseData.favItemsIds.length > 0
        ? dispatch(
            favoritesActions.setloadedFavoritesIds(responseData.favItemsIds)
          )
        : dispatch(favoritesActions.setloadedFavoritesIds([]));
    } catch (err) {}
  };
};

export const addToFavoritesIds = (sendRequest, user, productId) => {
  return async (dispatch) => {
    try {
      await sendRequest(
        // `http://localhost:5000/api/favorites/${productId}`,
        env.BASE_URL + `/api/favorites/${productId}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      console.log("LIKED PRODUCT");
    } catch (error) {}
  };
};

export const deleteFromFavoritesIds = (sendRequest, user, productId) => {
  return async (dispatch) => {
    try {
      await sendRequest(
        // `http://localhost:5000/api/favorites/${productId}`,
        env.BASE_URL + `/api/favorites/${productId}`,
        "DELETE",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );

      console.log("DISLIKED");
    } catch (error) {}
  };
};

export const favoritesActions = favoritesSlice.actions;

export default favoritesSlice;
