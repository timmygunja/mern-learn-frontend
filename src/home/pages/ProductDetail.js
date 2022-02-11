import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Button from "../../shared/UIElements/Button";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Section from "../../shared/UIElements/Section";
import { cartActions } from "../../store/cart-slice";
import BuyButton from "../components/BuyButton";
import LikeButton from "../components/LikeButton";
import classes from "./ProductDetail.module.css";
// import SizeForm from "../components/SizeForm";

const ProductDetail = (props) => {
  const dispatch = useDispatch();
  const productId = useParams().productId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
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
      await sendRequest(`http://localhost:5000/api/cart/${productId}`, "POST", {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Username: user.username,
      });
      dispatch(cartActions.addToCart())
    } catch (err) {}
  };

  const addToFavoritesHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(
        `http://localhost:5000/api/favorites/${productId}`,
        "POST",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );
    } catch (err) {}
  };

  if (loadedProduct) {
    return (
      <>
        {/* {isLoading && <LoadingSpinner asOverlay />}
        {<ErrorModal error={error} onClear={clearError} />} */}
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
                <LikeButton onClick={addToFavoritesHandler}>
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
