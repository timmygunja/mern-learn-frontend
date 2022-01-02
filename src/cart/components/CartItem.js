import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { cartActions } from "../../store/cart-slice";
import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, name, firm, price, size, quantity } = props.item;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const user = useSelector((state) => state.ui.user);

  const increaseQuantity = async () => {
    // dispatch(
    //   cartActions.addToCart({
    //     id: id,
    //     name: name,
    //     firm: firm,
    //     price: price,
    //     size: size,
    //   })
    // );
  };

  const decreaseQuantity = async (event) => {
    event.preventDefault();
    // dispatch(
    //   cartActions.removeFromCart({
    //     id: id,
    //   })
    // );
    try {
      await sendRequest(
        `http://localhost:5000/api/cart/${id}`,
        "DELETE",
        {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        }
      );
      
      history.push("/cart");
    } catch (err) {}
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}

      <li className={classes.product}>
        <Link to={`/products/${id}`} className={classes["prod-pic"]}>
          <img src={"product.png"} alt="" />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
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
    </>
  );
};

export default CartItem;
