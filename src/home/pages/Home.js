import { useEffect } from "react";
import ProductsList from "../components/ProductsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { getCartLength } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import RecommendSlider from "../components/RecommendSlider";
import { loadProducts } from "../../store/products-slice";
import { loadFavoritesIds } from "../../store/favorites-slice";

const Home = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const isLogged = useSelector((state) => state.ui.isLogged);
  const loadedProducts = useSelector((state) => state.products.loadedProducts);
  // const productsChanged = useSelector((state) => state.products.changed);
  const loadedFavoritesIds = useSelector(
    (state) => state.favorites.loadedFavoritesIds
  );

  // console.log("HOME PAGE LOADED");

  useEffect(() => {
    if (isLogged) {
      dispatch(loadFavoritesIds(sendRequest, user));
      dispatch(getCartLength(sendRequest, user));
    }
  }, [isLogged]);

  useEffect(() => {
    loadedFavoritesIds && dispatch(loadProducts(sendRequest));
    console.log("reloaded products");
  }, [loadedFavoritesIds]);

  useEffect(() => {
    dispatch(loadProducts(sendRequest));
  }, []);

  return (
    <>
      {loadedProducts && loadedFavoritesIds && (
        <ProductsList
          products={loadedProducts.slice(0, 4)}
          favorites={loadedFavoritesIds}
        />
      )}
      {loadedProducts && loadedFavoritesIds && (
        <RecommendSlider
          products={loadedProducts}
          favorites={loadedFavoritesIds}
        />
      )}
      {loadedProducts && loadedFavoritesIds && (
        <ProductsList
          products={loadedProducts.slice(4)}
          favorites={loadedFavoritesIds}
        />
      )}
    </>
  );
};

export default Home;
