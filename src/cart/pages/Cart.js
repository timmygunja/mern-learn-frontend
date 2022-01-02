import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Section from "../../shared/UIElements/Section";
import CartItem from "../components/CartItem";
import CartItemsList from "../components/CartItemsList";
import EmptyCartCard from "../components/EmptyCartCard";
import classes from "./Cart.module.css";

const Cart = () => {
  // const cartItems = useSelector((state) => state.cart.items);
  // const totalPrice = useSelector((state) => state.cart.totalPrice);
  // const cartIsEmpty = useSelector((state) => state.cart.totalCount) === 0;
  const user = useSelector((state) => state.ui.user);

  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCartItems, setLoadedCartItems] = useState(null);

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const loadCartItems = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/cart",
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );
        setLoadedCartItems(responseData.cartItems);
      } catch (err) {}
    };
    loadCartItems();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}

      <Section name="cart">
        <div className={classes.cart}>
          <div className={classes.mainbar}>
            {loadedCartItems && loadedCartItems.length === 0 && (
              <EmptyCartCard />
            )}
            {loadedCartItems && <CartItemsList cartItems={loadedCartItems} />}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Cart;
