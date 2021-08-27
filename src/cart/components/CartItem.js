import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, description, price, quantity } = props.item;

  const increaseQuantity = () => {
    dispatch(
      cartActions.addToCart({
        id: id,
        title: title,
        description: description,
        price: price,
      })
    );
  };

  const decreaseQuantity = () => {
    dispatch(
      cartActions.removeFromCart({
        id: id,
      })
    );
  };

  return (
    <li className={classes.product}>
      <div className={classes["prod-pic"]}>
        <img src={"product.png"} alt="" />
      </div>
      <div className={classes["prod-content"]}>
        <h1 className={classes["prod-title"]}>{title}</h1>
        <p className={classes["prod-description"]}>{description}</p>
        <p className={classes["prod-price"]}>{price * quantity} ₽</p>
        <button className={classes["prod-remove"]} onClick={decreaseQuantity}>
          -
        </button>
        <p className={classes["prod-quantity"]}>Quantity: {quantity}</p>
        <button className={classes["prod-add"]} onClick={increaseQuantity}>
          +
        </button>
      </div>
    </li>
  );
};

export default CartItem;
