import { useSelector } from "react-redux";
import Section from "../../shared/UIElements/Section";
import CartItem from "../components/CartItem";
import classes from "./Cart.module.css";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  return (
    <Section name="cart">
      <div className={classes.cart}>
        <div className={classes.mainbar}>
          {cartItems.map((item) => (
            <CartItem
              key={item.id}
              item={{
                id: item.id,
                title: item.title,
                firm: item.firm,
                price: item.price,
                size: item.size,
                quantity: item.quantity,
              }}
            />
          ))}
        </div>
        <div className={classes.sidebar}>Total price: {totalPrice}</div>
      </div>
    </Section>
  );
};

export default Cart;
