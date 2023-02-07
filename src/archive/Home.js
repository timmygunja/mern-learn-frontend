import React from 'react';
import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions, getCartLength } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";
import RecommendSlider from "../components/RecommendSlider";
import { loadProducts, productsActions } from "../../store/products-slice";
import { loadFavoritesIds } from "../../store/favorites-slice";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);
  const isLogged = useSelector((state) => state.ui.isLogged);
  const loadedProducts = useSelector((state) => state.products.loadedProducts);
  const loadedFavoritesIds = useSelector(
    (state) => state.favorites.loadedFavoritesIds
  );
  const { sendRequest } = useHttpClient();
  // const [loadedProducts, setLoadedProducts] = useState(null);
  // const [loadedFavoritesIds, setloadedFavoritesIds] = useState([]);
  // let responseData;

  console.log("HOME PAGE LOADED");
  // console.log("1", loadedProducts);

  useEffect(() => {
    dispatch(loadProducts(sendRequest));
    if (isLogged) {
      dispatch(loadFavoritesIds(sendRequest, user));
      dispatch(getCartLength(sendRequest, user));
    }
  }, []);

  // useEffect(() => {
  //   const loadFavoritesIds = async () => {
  // try {
  //   responseData = await sendRequest(
  //     "http://localhost:5000/api/favorites/ids",
  //     "GET",
  //     {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + user.token,
  //       Username: user.username,
  //     }
  //   );

  //   responseData.favItemsIds.length > 0
  //     ? setloadedFavoritesIds(responseData.favItemsIds)
  //     : setloadedFavoritesIds([]);
  //       console.log("loadedFavoritesIds AFTER setState", loadedFavoritesIds);
  //     } catch (error) {}
  //   };

  //
  //
  //
  // TODO: MOVE LOADEDPRODUCT AND FAVORITES LOGIC TO STORE
  //
  //
  //

  //   isLogged && loadFavoritesIds();
  //   // !isLogged && setloadedFavoritesIds([]);
  // }, [sendRequest, isLogged]);

  // useEffect(() => {
  //   const loadProducts = async () => {
  //     try {
  //       responseData = await sendRequest(
  //         "http://localhost:5000/api/products",
  //         "GET",
  //         {
  //           "Content-Type": "application/json",
  //         }
  //       );

  //       setLoadedProducts(responseData.products);
  //     } catch (err) {}
  //   };

  //   loadProducts();
  // }, [sendRequest]);

  // useEffect(() => {
  // const getCartLength = async () => {
  //   try {
  //     const responseData = await sendRequest(
  //       "http://localhost:5000/api/cart/getCartLength",
  //       "GET",
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + user.token,
  //         Username: user.username,
  //       }
  //     );

  //     dispatch(cartActions.setTotalCartCount(responseData.cartLength));
  //   } catch (err) {}
  // };

  //   isLogged && getCartLength();
  // }, [sendRequest, isLogged]);

  return (
    <>
      {!isLogged && loadedProducts && (
        <ProductsList
          products={loadedProducts.slice(0, 4)}
          favorites={loadedFavoritesIds}
        />
      )}
      {isLogged && loadedProducts && loadedFavoritesIds && (
        <ProductsList
          products={loadedProducts.slice(0, 4)}
          favorites={loadedFavoritesIds}
        />
      )}
      {isLogged && loadedProducts && loadedFavoritesIds && (
        <RecommendSlider
          products={loadedProducts}
          favorites={loadedFavoritesIds}
        />
      )}
      {isLogged && loadedProducts && loadedFavoritesIds && (
        <ProductsList
          products={loadedProducts.slice(4)}
          favorites={loadedFavoritesIds}
        />
      )}
    </>
  );
};

export default Home;
