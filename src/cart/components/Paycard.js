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
      <p className={classes["total"]}>{`Total amount: ${totalPrice} ₽`}</p>
      <PaycardItemsList
        cartItems={props.cartItems}
        className={classes["paycard-items"]}
      />
      <BuyButton>Proceed to buy</BuyButton>
    </div>
  );
};

export default Paycard;
