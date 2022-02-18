import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import RecommendSlider from "../components/RecommendSlider";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);
  const isLogged = useSelector((state) => state.ui.isLogged);
  const { sendRequest } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState(null);
  const [loadedFavorites, setLoadedFavorites] = useState(null);
  let responseData;

  useEffect(() => {
    const loadFavorites = async () => {
      try {
        responseData = await sendRequest(
          "http://localhost:5000/api/favorites/ids",
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );

        responseData.favItemsIds.length > 0
          ? setLoadedFavorites(responseData.favItemsIds)
          : setLoadedFavorites([]);
      } catch (error) {}
    };

    isLogged && loadFavorites();
  }, [sendRequest, isLogged]);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        responseData = await sendRequest(
          "http://localhost:5000/api/products",
          "GET",
          {
            "Content-Type": "application/json",
          }
        );

        setLoadedProducts(responseData.products);
      } catch (err) {}
    };

    loadProducts();
  }, [sendRequest]);

  useEffect(() => {
    const getCartLength = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/cart/getCartLength",
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );

        dispatch(cartActions.setTotalCartCount(responseData.cartLength));
      } catch (err) {}
    };

    isLogged && getCartLength();
  }, [sendRequest, isLogged]);

  return (
    <>
      {loadedProducts && loadedFavorites && (
        <ProductsList
          products={loadedProducts.slice(0, 4)}
          favorites={loadedFavorites}
        />
      )}
      {loadedProducts && loadedFavorites && (
        <RecommendSlider
          products={loadedProducts}
          favorites={loadedFavorites}
        />
      )}
      {loadedProducts && loadedFavorites && (
        <ProductsList
          products={loadedProducts.slice(4)}
          favorites={loadedFavorites}
        />
      )}
    </>
  );
};

export default Home;
