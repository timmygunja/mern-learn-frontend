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
  let quantity = 1;
  const { id, name, firm, price, image } = props.item;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const user = useSelector((state) => state.ui.user);

  const increaseQuantity = async () => {
    dispatch(cartActions.addToCart());
  };

  const decreaseQuantity = async (event) => {
    event.preventDefault();
    
    if (quantity === 1) {
      try {
        await sendRequest(`http://localhost:5000/api/cart/${id}`, "DELETE", {
          "Content-Type": "application/json",
          Authorization: "Bearer " + user.token,
          Username: user.username,
        });
      } catch (err) {}
    }

    dispatch(cartActions.removeFromCart());
    history.push("/cart");
  };

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}

      <li className={classes.product}>
        <Link to={`/products/${id}`} className={classes["prod-pic"]}>
          <img src={`http://localhost:5000/${image}`} alt="" />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>
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
