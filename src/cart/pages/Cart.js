import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BuyButton from "../../home/components/BuyButton";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Card from "../../shared/UIElements/Card";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Section from "../../shared/UIElements/Section";
import { cartActions } from "../../store/cart-slice";
import CartItemsList from "../components/CartItemsList";
import EmptyCartCard from "../components/EmptyCartCard";
import EmptyPaycard from "../components/EmptyPaycard";
import Paycard from "../components/Paycard";
import PaycardItemsList from "../components/PaycardItemsList";
import classes from "./Cart.module.css";

let deletedItem;

const Cart = () => {
  // const cartItems = useSelector((state) => state.cart.items);
  // const totalPrice = useSelector((state) => state.cart.totalPrice);
  // const cartIsEmpty = useSelector((state) => state.cart.totalCount) === 0;
  const user = useSelector((state) => state.ui.user);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedCartItems, setLoadedCartItems] = useState(null);
  const [totalPrice, setTotalPrice] = useState(null);
  const cartTotalCount = useSelector((state) => state.cart.totalCount);

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
        setTotalPrice(responseData.cartTotalPrice);
      } catch (error) {}
    };
    loadCartItems();
  }, [sendRequest, cartTotalCount]);

  const deleteItemHandler = (itemId) => {
    loadedCartItems.map((item) => {
      if (item.id === itemId) {
        deletedItem = item;
      }
    });

    setLoadedCartItems((prevItems) =>
      prevItems.filter((item) => item !== deletedItem)
    );
    setTotalPrice(totalPrice - deletedItem.product.price);
  };

  return (
    <>
      {/* {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />} */}

      <Section name="cart">
        <div className={classes["cart"]}>
          <div className={classes["mainbar"]}>
            {loadedCartItems && loadedCartItems.length === 0 && (
              <EmptyCartCard />
            )}
            {loadedCartItems && (
              <CartItemsList
                cartItems={loadedCartItems}
                onClickDelete={deleteItemHandler}
              />
            )}
          </div>
          <div className={classes["sidebar"]}>
            {loadedCartItems && loadedCartItems.length === 0 && (
              <EmptyPaycard />
            )}
            {loadedCartItems && totalPrice && (
              <Paycard cartItems={loadedCartItems} totalPrice={totalPrice} />
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Cart;
