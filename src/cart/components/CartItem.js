import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";
import env from "../../env";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  const cartItemId = props.cartItemId;
  const { id, name, firm, price, image, quantity } = props.item;

  // const increaseQuantity = async (event) => {
  //   event.preventDefault();

  //   try {
  //     await sendRequest(`http://localhost:5000/api/cart/${id}`, "POST", {
  //       "Content-Type": "application/json",
  //       Authorization: "Bearer " + user.token,
  //       Username: user.username,
  //     });

  //     dispatch(cartActions.addToCartTotalCount());
  //   } catch (err) {}
  // };
  //
  // const decreaseQuantity = async (event) => {
  //   event.preventDefault();

  //   try {
  //     await sendRequest(
  //       `http://localhost:5000/api/cart/${cartItemId}`,
  //       "DELETE",
  //       {
  //         "Content-Type": "application/json",
  //         Authorization: "Bearer " + user.token,
  //         Username: user.username,
  //       }
  //     );

  //     dispatch(cartActions.removeFromCartTotalCount());
  //   } catch (err) {}

  //   if (quantity <= 1) {
  //     props.onClickDelete(cartItemId);
  //   }
  // };

  const increaseQuantity = async (event) => {
    event.preventDefault();
    user.isLogged
      ? await dispatch(
          cartActions.increaseCartItemQuantity(sendRequest, user, id)
        )
      : dispatch(cartActions.unloggedAddToCart({ product: props.item }));

    dispatch(cartActions.addToCartTotalCount());
    dispatch(cartActions.setCartChanged(true));
  };

  const decreaseQuantity = async (event) => {
    event.preventDefault();
    user.isLogged
      ? await dispatch(
          cartActions.decreaseCartItemQuantity(sendRequest, user, id)
        )
      : dispatch(cartActions.unloggedDeleteFromCart({ product: props.item }));

    dispatch(cartActions.removeFromCartTotalCount());
    dispatch(cartActions.setCartChanged(true));
  };

  return (
    <>
      <li className={classes.product}>
        <Link
          to={`/products/${id}`}
          className={classes["prod-pic"] + " hard-centered"}
        >
          <img
            // src={`http://localhost:5000/${image}`}
            src={env.BASE_URL + `/${image}`}
            alt=""
          />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>
          <button className={classes["prod-remove"]} onClick={decreaseQuantity}>
            -
          </button>
          <p className={classes["prod-quantity"]}>Количество: {quantity}</p>
          <button className={classes["prod-add"]} onClick={increaseQuantity}>
            +
          </button>
        </div>
      </li>
    </>
  );
};

export default CartItem;
