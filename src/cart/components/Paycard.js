import BuyButton from "../../home/components/BuyButton";
import classes from "./Paycard.module.css";
import PaycardItemsList from "./PaycardItemsList";

const Paycard = (props) => {
  return (
    <div className={classes["paycard"]}>
      <p className={classes["total"]}>{`Total amount: ${props.totalPrice} ₽`}</p>
      <PaycardItemsList
        cartItems={props.cartItems}
        className={classes["paycard-items"]}
      />
      <BuyButton>Proceed to buy</BuyButton>
    </div>
  );
};

export default Paycard;
