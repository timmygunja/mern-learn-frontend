import React from 'react';
import classes from "./PaycardItem.module.css";

const PaycardItem = (props) => {
  const { name, price, quantity } = props.item;

  return (
    <div className={classes["item"]}>
      <p className={classes["title"]}>{name}</p>
      <p className={classes["quantity"]}>{`x${quantity}`}</p>
      <p className={classes["price"]}>{`${price * quantity} ₽`}</p>
    </div>
  );
};

export default PaycardItem;
