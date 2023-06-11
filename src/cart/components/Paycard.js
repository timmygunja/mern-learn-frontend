import React, { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import BuyButton from "../../home/components/BuyButton";
import classes from "./Paycard.module.css";
import PaycardItemsList from "./PaycardItemsList";
import PaymentModal from "./PaymentModal";

const Paycard = (props) => {
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  // const cartChanged = useSelector((state) => state.cart.changed);

  // useEffect(() => {}, [cartChanged]);

  console.log("PAYCART RELOADED WITH TOTAL OF ", totalPrice);

  const [modalOpen, setModalOpen] = useState(false);
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  return (
    <div className={classes["paycard"]}>
      <p className={classes["total"]}>{`Итог: ${totalPrice} ₽`}</p>
      <PaycardItemsList
        cartItems={props.cartItems}
        className={classes["paycard-items"]}
      />
      <BuyButton onClick={handleOpen}>Оформить заказ</BuyButton>
      <PaymentModal open={modalOpen} onClose={handleClose} />
    </div>
  );
};

export default Paycard;
