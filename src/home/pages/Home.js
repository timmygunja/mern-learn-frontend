import React from "react";
import { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getCartLength } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import RecommendSlider from "../components/RecommendSlider";
import { loadFilteredProducts, loadProducts } from "../../store/products-slice";
import { loadFavoritesIds } from "../../store/favorites-slice";

const Home = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const isLogged = useSelector((state) => state.ui.isLogged);
  const loadedProducts = useSelector((state) => state.products.loadedProducts);
  const filteredProducts = useSelector(
    (state) => state.products.filteredProducts
  );
  // const productsChanged = useSelector((state) => state.products.changed);
  const loadedFavoritesIds = useSelector(
    (state) => state.favorites.loadedFavoritesIds
  );
  const screenWidth = window.innerWidth;
  let sliceNumber = 4;

  if (750 < screenWidth && screenWidth < 1000) {
    sliceNumber = 3;
  } else if (screenWidth < 751) {
    sliceNumber = 2;
  }

  console.log("HOME PAGE LOADED");

  useEffect(() => {
    if (isLogged) {
      dispatch(loadFavoritesIds(sendRequest, user));
      dispatch(getCartLength(sendRequest, user));
    }
  }, [isLogged]);

  // Rerender products on like
  useEffect(() => {
    loadedFavoritesIds &&
      dispatch(loadProducts(sendRequest)) &&
      dispatch(loadFilteredProducts(sendRequest, "popular"));
    console.log("reloaded products");
  }, [loadedFavoritesIds]);

  useEffect(() => {
    dispatch(loadProducts(sendRequest));
    dispatch(loadFilteredProducts(sendRequest, "popular"));
  }, []);

  return (
    <>
      {loadedProducts && (loadedFavoritesIds || !isLogged) && (
        <ProductsList
          products={loadedProducts.slice(0, sliceNumber)}
          favorites={loadedFavoritesIds}
        />
      )}
      {filteredProducts && (loadedFavoritesIds || !isLogged) && (
        <RecommendSlider
          products={filteredProducts}
          favorites={loadedFavoritesIds}
        />
      )}
      {loadedProducts && (loadedFavoritesIds || !isLogged) && (
        <ProductsList
          products={loadedProducts.slice(sliceNumber)}
          favorites={loadedFavoritesIds}
        />
      )}
    </>
  );
};

export default Home;
