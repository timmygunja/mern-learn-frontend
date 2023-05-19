import React from 'react';
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import BuyButton from "../../home/components/BuyButton";
import classes from "./EmptyPaycard.module.css";

const EmptyPaycard = (props) => {
  const history = useHistory();

  const buttonHandler = () => {
    history.push("/");
  };

  return (
    <div className={classes["paycard"]}>
      <p className={classes["total"]}>{"Итог: 0₽"}</p>
      <BuyButton onClick={buttonHandler}>Перейти в каталог</BuyButton>
    </div>
  );
};

export default EmptyPaycard;
