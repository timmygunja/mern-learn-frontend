import React from "react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import Section from "../../shared/UIElements/Section";
import { cartActions, loadCartItems } from "../../store/cart-slice";
import CartItemsList from "../components/CartItemsList";
import EmptyCartCard from "../components/EmptyCartCard";
import EmptyPaycard from "../components/EmptyPaycard";
import Paycard from "../components/Paycard";
import classes from "./Cart.module.css";

let deletedItem;

const Cart = () => {
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  const user = useSelector((state) => state.ui.user);
  // const [loadedCartItems, setLoadedCartItems] = useState(null);
  // const [totalPrice, setTotalPrice] = useState(null);
  const cartTotalCount = useSelector((state) => state.cart.totalCount);
  const loadedCartItems = useSelector((state) => state.cart.loadedCartItems);
  const cartChanged = useSelector((state) => state.cart.changed);
  const totalPrice = useSelector((state) => state.cart.totalPrice);

  // useEffect(() => {
  //   // async lower because useEffect async is a bad practice
  //   const loadCartItems = async () => {
  //     try {
  //       const responseData = await sendRequest(
  //         "http://localhost:5000/api/cart",
  //         "GET",
  //         {
  //           "Content-Type": "application/json",
  //           Authorization: "Bearer " + user.token,
  //           Username: user.username,
  //         }
  //       );
  //       setLoadedCartItems(responseData.cartItems);
  //       setTotalPrice(responseData.cartTotalPrice);
  //     } catch (error) {}
  //   };
  //   loadCartItems();
  // }, [sendRequest, cartTotalCount]);

  useEffect(async () => {
    await dispatch(loadCartItems(sendRequest, user));
    await dispatch(cartActions.setCartChanged(false));
  }, [cartChanged]);

  // const deleteItemHandler = (itemId) => {
  //   loadedCartItems.map((item) => {
  //     if (item.id === itemId) {
  //       deletedItem = item;
  //     }
  //   });

  //   setLoadedCartItems((prevItems) =>
  //     prevItems.filter((item) => item !== deletedItem)
  //   );
  //   setTotalPrice(totalPrice - deletedItem.product.price);
  // };

  return (
    <>
      <Section name="Корзина">
        <div className={classes["cart"]}>
          <div className={classes["mainbar"]}>
            {loadedCartItems && loadedCartItems.length === 0 && (
              <EmptyCartCard />
            )}
            {loadedCartItems && (
              <CartItemsList
                cartItems={loadedCartItems}
                // onClickDelete={deleteItemHandler}
              />
            )}
          </div>
          <div className={classes["sidebar"]}>
            {loadedCartItems && loadedCartItems.length === 0 && (
              <EmptyPaycard />
            )}
            {loadedCartItems && totalPrice && (
              // <Paycard cartItems={loadedCartItems} totalPrice={totalPrice} />
              <Paycard cartItems={loadedCartItems} />
            )}
          </div>
        </div>
      </Section>
    </>
  );
};

export default Cart;
