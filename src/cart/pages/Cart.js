import { useSelector } from "react-redux";
import Section from "../../shared/UIElements/Section";
import CartItem from "../components/CartItem";

const Cart = () => {
    const cartItems = useSelector(state => state.cart.items)    

  return (
    <Section name='cart'>
      <h2>Your Shopping Cart</h2>
      <ul>
        {cartItems.map((item) => (
          <CartItem
            key={item.id}
            item={{
              id: item.id,
              title: item.title,
              description: item.description,
              price: item.price,
            }}
          />
        ))}
      </ul>
    </Section>
  );
};

export default Cart;
