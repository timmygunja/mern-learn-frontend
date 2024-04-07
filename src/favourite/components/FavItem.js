import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { addProductToCart } from "../../store/cart-slice";
import {
  deleteFromFavoritesIds,
  favoritesActions,
} from "../../store/favorites-slice";
import { cartActions } from "../../store/cart-slice";
import classes from "./FavItem.module.css";
import env from "../../env";

const FavItem = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);
  const { id, name, firm, price, image } = props.item;
  const { sendRequest } = useHttpClient();

  // console.log(name);

  // const removeFromFavoritesHandler = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await sendRequest(`http://localhost:5000/api/favorites/${id}`, "DELETE", {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + user.token,
  //       Username: user.username,
  //     });
  //     props.onClickDelete(id);
  //   } catch (err) {}
  // };

  const removeFromFavoritesHandler = async (e) => {
    e.preventDefault();
    user.isLogged
      ? await dispatch(deleteFromFavoritesIds(sendRequest, user, id))
      : dispatch(favoritesActions.unloggedDeleteFromFavorites(id));

    dispatch(favoritesActions.deleteFromFavoritesIdsReducer(id));
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    user.isLogged
      ? await dispatch(addProductToCart(sendRequest, user, id))
      : dispatch(cartActions.unloggedAddToCart({ product: props.item }));

    dispatch(cartActions.addToCartTotalCount());
    dispatch(cartActions.setCartChanged(true));

    // dispatch(favoritesActions.setFavoritesChanged(true));
  };

  return (
    <>
      <li className={classes.product}>
        <button
          type="sumbit"
          className={classes["prod-delete-from-favorites"]}
          onClick={removeFromFavoritesHandler}
        >
          -
        </button>

        <Link to={`/products/${id}`} className={classes["prod-content"]}>
          <div className={classes["prod-pic"]}>
            <img
              // src={`http://localhost:5000/${image}`}
              src={env.BASE_URL + `/${image}`}
              alt=""
            />
          </div>
          <div className={classes["prod-info"]}>
            <h1 className={classes["prod-name"]}>{name}</h1>
            <p className={classes["prod-firm"]}>{firm}</p>
            <p className={classes["prod-price"]}>{price} ₽</p>
          </div>
        </Link>

        <button
          type="sumbit"
          className={classes["prod-add-to-cart"]}
          onClick={addToCartHandler}
        >
          +
        </button>
      </li>
    </>
  );
};

export default FavItem;
