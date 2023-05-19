import React from 'react';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BuyButton from "../../home/components/BuyButton";
import classes from "./Paycard.module.css";
import PaycardItemsList from "./PaycardItemsList";

const Paycard = (props) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  // const cartChanged = useSelector((state) => state.cart.changed);

  // useEffect(() => {}, [cartChanged]);

  console.log("PAYCART RELOADED WITH TOTAL OF ", totalPrice);

  return (
    <div className={classes["paycard"]}>
      <p className={classes["total"]}>{`Итог: ${totalPrice} ₽`}</p>
      <PaycardItemsList
        cartItems={props.cartItems}
        className={classes["paycard-items"]}
      />
      <BuyButton>Оформить заказ</BuyButton>
    </div>
  );
};

export default Paycard;
