import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import { cartActions } from "../../store/cart-slice";
import classes from "./FavItem.module.css";

const FavItem = (props) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);
  const { id, name, firm, price, image } = props.item;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const removeFromFavoritesHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/favorites/${id}`, "DELETE", {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Username: user.username,
      });
      props.onClickDelete(id);
    } catch (err) {}
  };

  const addToCartHandler = async (e) => {
    e.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/cart/${id}`, "POST", {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Username: user.username,
      });
      dispatch(cartActions.addToCart());
    } catch (err) {}
  };

  return (
    <>
      {/* {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />} */}
      <li className={classes.product}>
        <button
          type="sumbit"
          className={classes["prod-delete-from-favorites"]}
          onClick={removeFromFavoritesHandler}
        >
          -
        </button>

        <Link to={`/products/${id}`} className={classes["prod-content"]}>
          <div className={classes["prod-pic"]}>
            <img src={`http://localhost:5000/${image}`} alt="" />
          </div>
          <div className={classes["prod-info"]}>
            <h1 className={classes["prod-name"]}>{name}</h1>
            <p className={classes["prod-firm"]}>{firm}</p>
            <p className={classes["prod-price"]}>{price} ₽</p>
          </div>
        </Link>

        <button
          type="sumbit"
          className={classes["prod-add-to-cart"]}
          onClick={addToCartHandler}
        >
          +
        </button>
      </li>
    </>
  );
};

export default FavItem;
