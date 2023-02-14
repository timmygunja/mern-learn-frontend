import React from 'react';
import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState } from "react";
import {
  addToFavoritesIds,
  deleteFromFavoritesIds,
  favoritesActions,
} from "../../store/favorites-slice";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import env from "../../env";

const ProductItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const { id, name, firm, price, image, isFavorite } = props;
  const [likeClass, setLikeClass] = useState(
    isFavorite ? classes["prod-like-active"] : classes["prod-like"]
  );

  const onLikeHandler = async (event) => {
    event.preventDefault();
    if (user.username) {
      if (!isFavorite) {
        await dispatch(addToFavoritesIds(sendRequest, user, id));
        await dispatch(favoritesActions.addToFavoritesIdsReducer(id));
        setLikeClass(classes["prod-like-active"]);
      } else {
        await dispatch(deleteFromFavoritesIds(sendRequest, user, id));
        await dispatch(favoritesActions.deleteFromFavoritesIdsReducer(id));
        setLikeClass(classes["prod-like"]);
      }
    } else {
      history.push("/auth");
    }
  };

  return (
    <>
      <div className={classes.product}>
        <Link to={`/products/${id}`} className={classes["prod-pic"]}>
          <img
            // src={`http://localhost:5000/${image}`}
            // src={env.BASE_URL + `/${image}`}
            src={env.BASE_URL + "uploads/images/airforce.png"}
            alt=""
          />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>

          <button
            // className={
            //   isFavorite ? classes["prod-like-active"] : classes["prod-like"]
            // }
            className={likeClass}
            onClick={onLikeHandler}
          >
            <img src="heart.svg" />
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
