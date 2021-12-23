// import classes from "./CartItemsList.module.css";
import CartItem from "./CartItem";

const CartItemsList = (props) => {
  return (
    <>
      {props.cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            item={{
              id: cartItem.id,
              name: cartItem.name,
              firm: cartItem.firm,
              price: cartItem.price,
              // size: cartItem.size,
              // quantity: cartItem.quantity,
            }}
          />
        );
      })}
    </>
  );
};

export default CartItemsList;
