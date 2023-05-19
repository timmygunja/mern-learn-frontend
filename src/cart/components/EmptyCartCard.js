import React from 'react';
import { Link } from "react-router-dom";
import classes from "./EmptyCartCard.module.css";

const EmptyCartCard = (props) => {
  return (
    <Link to={"/"} className={classes.product}>
      <div className={classes["prod-pic"]}>
        <img src={"product.png"} alt="" />
      </div>
      <div className={classes["prod-content"]}>
        <div className={classes["prod-name"]}>Нет товаров в корзине</div>
      </div>
    </Link>
  );
};

export default EmptyCartCard;
