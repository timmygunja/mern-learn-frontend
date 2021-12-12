import { useDispatch } from "react-redux";
import { Link, useHistory } from "react-router-dom";
import { productsActions } from "../../store/products-slice";
import classes from "./FavItem.module.css";

const FavItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, name, firm, price } = props.item;

  const removeFromFavourite = () => {
    dispatch(
      productsActions.removeFromFavourite({
        id: id,
      })
    );
  };

  const onAddHandler = () => {
    history.push(`/products/${id}`)
  }

  return (
    <li className={classes.product}>
      <Link to={`/products/${id}`} className={classes["prod-pic"]}>
        <img src={"product.png"} alt="" />
      </Link>
      <div className={classes["prod-content"]}>
        <h1 className={classes["prod-name"]}>{name}</h1>
        <p className={classes["prod-firm"]}>{firm}</p>
        <p className={classes["prod-price"]}>{price} ₽</p>
        <button
          className={classes["prod-remove"]}
          onClick={removeFromFavourite}
        >
          remove from list
        </button>
        <button
          className={classes["prod-add"]}
          onClick={onAddHandler}
        >
          proceed to buy
        </button>
      </div>
    </li>
  );
};

export default FavItem;
