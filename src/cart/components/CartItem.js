import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, firm, price, size, quantity } = props.item;

  const increaseQuantity = () => {
    dispatch(
      cartActions.addToCart({
        id: id,
        title: title,
        firm: firm,
        price: price,
        size: size,
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
      <Link to={`/products/${id}`} className={classes["prod-pic"]}>
        <img src={"product.png"} alt="" />
      </Link>
      <div className={classes["prod-content"]}>
        <h1 className={classes["prod-title"]}>{title}</h1>
        <p className={classes["prod-firm"]}>{firm}</p>
        <p className={classes["prod-price"]}>{price} ₽</p>
        <p className={classes["prod-size"]}>Size: {size}</p>
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
