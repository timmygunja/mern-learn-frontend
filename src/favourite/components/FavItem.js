import { Link, useHistory } from "react-router-dom";
import classes from "./FavItem.module.css";

const FavItem = (props) => {
  const history = useHistory();
  const { id, name, firm, price, image } = props.item;

  const removeFromFavourite = () => {
    
  };

  const onAddHandler = () => {
    history.push(`/products/${id}`)
  }

  return (
    <li className={classes.product}>
      <Link to={`/products/${id}`} className={classes["prod-pic"]}>
        <img src={`http://localhost:5000/${image}`} alt="" />
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
