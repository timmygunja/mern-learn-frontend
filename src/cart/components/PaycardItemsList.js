// import classes from "./CartItemsList.module.css";
import PaycardItem from "./PaycardItem";

const PaycardItemsList = (props) => {
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
            }}
          />
        );
      })}
    </>
  );
};

export default PaycardItemsList;
