import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { productsActions } from "../../store/products-slice";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, name, firm, price, image, isFavourite } = props;

  const onLikeHandler = () => {
    if (!isFavourite) {
      dispatch(
        productsActions.addToFavourite({
          id: id,
        })
      );
    } else {
      dispatch(
        productsActions.removeFromFavourite({
          id: id,
        })
      );
    }
  };

  return (
    <div className={classes.product}>
      <Link to={`/products/${id}`} className={classes["prod-pic"]}>
        <img src={`http://localhost:5000/${image}`} alt="" />
      </Link>
      <div className={classes["prod-content"]}>
        <h1 className={classes["prod-name"]}>{name}</h1>
        <p className={classes["prod-firm"]}>{firm}</p>
        <p className={classes["prod-price"]}>{price} ₽</p>
        <button
          className={
            isFavourite ? classes["prod-like-active"] : classes["prod-like"]
          }
          onClick={onLikeHandler}
        >
          Like
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
