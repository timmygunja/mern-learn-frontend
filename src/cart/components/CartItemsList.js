// import classes from "./CartItemsList.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import CartItem from "./CartItem";

const CartItemsList = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {props.cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItemId={cartItem.id}
            onClickDelete={props.onClickDelete}
            item={{
              id: cartItem.product.id,
              name: cartItem.product.name,
              firm: cartItem.product.firm,
              price: cartItem.product.price,
              image: cartItem.product.image,
              quantity: cartItem.quantity,
              // size: cartItem.size,
            }}
          />
        );
      })}
    </>
  );
};

export default CartItemsList;
