// import classes from "./CartItemsList.module.css";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import CartItem from "./CartItem";
import PaycardItem from "./PaycardItem";

const PaycardItemsList = (props) => {
  const dispatch = useDispatch();

  return (
    <>
      {props.cartItems.map((cartItem) => {
        return (
          <PaycardItem
            key={cartItem.product.id}
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

export default PaycardItemsList;
