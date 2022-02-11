// import classes from "./CartItemsList.module.css";
import CartItem from "./CartItem";

const CartItemsList = (props) => {
  return (
    <>
      {props.cartItems.map((cartItem) => {
        return (
          <CartItem
            key={cartItem.id}
            cartItemId={cartItem.id}
            onClickDelete={props.onClickDelete}
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

export default CartItemsList;
