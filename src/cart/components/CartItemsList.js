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
            onClickDelete={props.onClickDelete}
            item={{
              id: cartItem.id,
              name: cartItem.name,
              firm: cartItem.firm,
              price: cartItem.price,
              image: cartItem.image,
              // size: cartItem.size,
              // quantity: cartItem.quantity,
            }}
          />
        );
      })}
    </>
  );
};

export default CartItemsList;
