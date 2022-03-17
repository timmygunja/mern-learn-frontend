import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
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

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const { sendRequest } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState(null);
  const user = useSelector((state) => state.ui.user);

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const loadProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`,
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
      await dispatch(addProductToCart(sendRequest, user, productId));
      await dispatch(cartActions.setCartChanged(true));
    } catch (err) {}
  };

  const addToFavoritesIdsHandler = async (e) => {
    e.preventDefault();
    try {
      await dispatch(addToFavoritesIds(sendRequest, user, productId));
      await dispatch(favoritesActions.setFavoritesChanged(true));
    } catch (err) {}
  };

  if (loadedProduct) {
    return (
      <>
        <Section name="Product">
          <div className={classes.product}>
            <div className={classes.mainbar}>
              <img
                className={classes["product-img"]}
                src={`http://localhost:5000/${loadedProduct.image}`}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={`http://localhost:5000/${loadedProduct.image}`}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={`http://localhost:5000/${loadedProduct.image}`}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={`http://localhost:5000/${loadedProduct.image}`}
                alt=""
              />
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
                <BuyButton onClick={addToCartHandler}>Add To Cart</BuyButton>
                <LikeButton onClick={addToFavoritesIdsHandler}>
                  Add To Favorites
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
