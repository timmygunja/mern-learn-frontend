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
      <p className={classes["total"]}>{"Total amount: 0₽"}</p>
      <BuyButton onClick={buttonHandler}>See products</BuyButton>
    </div>
  );
};

export default EmptyPaycard;
