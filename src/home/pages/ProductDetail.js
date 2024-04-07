import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Section from "../../shared/UIElements/Section";
import { addProductToCart, cartActions } from "../../store/cart-slice";
import {
  addToFavoritesIds,
  favoritesActions,
} from "../../store/favorites-slice";
import BuyButton from "../components/BuyButton";
import LikeButton from "../components/LikeButton";
import classes from "./ProductDetail.module.css";
import env from "../../env";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const { sendRequest } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState(null);
  const user = useSelector((state) => state.ui.user);
  const loadedCartItems = useSelector((state) => state.cart.loadedCartItems);
  const loadedFavoritesIds = useSelector(
    (state) => state.favorites.loadedFavoritesIds
  );
  // const loadedCartItemsIds = loadedCartItems.map((item) => {
  //   return item.product.id;
  // });

  // const history = useHistory();

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const loadProduct = async () => {
      try {
        const responseData = await sendRequest(
          // `http://localhost:5000/api/products/${productId}`,
          env.BASE_URL + `/api/products/${productId}`,
          "GET",
          {
            "Content-Type": "application/json",
          }
        );

        setLoadedProduct(responseData.product);
      } catch (err) {}
    };
    loadProduct();
  }, [sendRequest]);

  const addToCartHandler = async (e) => {
    e.preventDefault();

    try {
      if (user.isLogged) {const user = useSelector((state) => state.ui.user);
        await dispatch(addProductToCart(sendRequest, user, productId));
      } else {
        dispatch(
          cartActions.unloggedAddToCart({
            product: loadedProduct,
          })
        );

        dispatch(cartActions.addToCartTotalCount());
        dispatch(cartActions.setCartChanged(true));
      }
    } catch (err) {}
  };

  const addToFavoritesIdsHandler = async (e) => {
    e.preventDefault();

    try {
      if (!loadedFavoritesIds.includes(productId)) {
        user.isLogged
          ? await dispatch(addToFavoritesIds(sendRequest, user, productId))
          : dispatch(favoritesActions.unloggedAddToFavorites(loadedProduct));

        await dispatch(favoritesActions.addToFavoritesIdsReducer(productId));
      }
    } catch (err) {}
  };

  if (loadedProduct) {
    return (
      <>
        <Section name="Товар">
          <div className={classes.product}>
            <div className={classes.mainbar}>
              <div className="hard-centered">
                <img
                  className={classes["product-img"]}
                  // src={`http://localhost:5000/${loadedProduct.image}`}
                  src={env.BASE_URL + `/${loadedProduct.image}`}
                  alt=""
                />
              </div>
              <div className="hard-centered">
                <img
                  className={classes["product-img"]}
                  // src={`http://localhost:5000/${loadedProduct.image}`}
                  src={env.BASE_URL + `/${loadedProduct.image2}`}
                  alt=""
                />
              </div>
              <div className="hard-centered">
                <img
                  className={classes["product-img"]}
                  // src={`http://localhost:5000/${loadedProduct.image}`}
                  src={env.BASE_URL + `/${loadedProduct.image3}`}
                  alt=""
                />
              </div>
              <div className="hard-centered">
                <img
                  className={classes["product-img"]}
                  // src={`http://localhost:5000/${loadedProduct.image}`}
                  src={env.BASE_URL + `/${loadedProduct.image4}`}
                  alt=""
                />
              </div>
            </div>
            <div className={classes.sidebar}>
              <div className={classes["product-info"]}>
                <div className={classes.name}>{loadedProduct.name}</div>
                <div className={classes.price}>{loadedProduct.price} ₽</div>
                <div className={classes.firm}>{loadedProduct.firm}</div>
                <div className={classes.description}>
                  <hr />
                  <p>{loadedProduct.description}</p>
                  <hr />
                </div>
              </div>
              <div className={classes["product-buttons"]}>
                <BuyButton onClick={addToCartHandler}>В корзину</BuyButton>
                <LikeButton onClick={addToFavoritesIdsHandler}>
                  В избранное
                </LikeButton>
              </div>
            </div>
          </div>
        </Section>
      </>
    );
  } else {
    return <h3 className={"centered"}>No such product found</h3>;
  }
};

export default ProductDetail;
