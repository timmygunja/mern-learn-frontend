import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import { productsActions } from "../../store/products-slice";
import { sizesActions } from "../../store/sizes-slice";
import ButtonSize from "./ButtonSize";
import classes from "./SizeForm.module.css";

const SizeForm = (props) => {
  const dispatch = useDispatch();
  const { id, name, firm, description, price, isFavourite } = props;
  const sizeList = useSelector((state) => state.sizes.sizeList);
  const sizeChosen = useSelector((state) => state.sizes.sizeChosen);

  const onLikeHandler = (e) => {
    e.preventDefault();
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

  const onAddToCartHandler = (e) => {
    e.preventDefault();
    dispatch(
      cartActions.addToCart({
        id: `${id}-${sizeChosen}`,
        name: name,
        firm: firm,
        description: description,
        price: price,
        size: sizeChosen,
      })
    );
    dispatch(sizesActions.chooseSize(undefined));
  };

  return (
    <form className={classes["size-table"]}>
      {sizeList.map((size) => {
        return <ButtonSize key={size} value={size}></ButtonSize>;
      })}

      <button
        className={ isFavourite ? classes["like-button-active"] : classes["like-button"]}
        type={"submit"}
        onClick={onLikeHandler}
      >
        Favourite
      </button>
      <button
        className={classes["add-button"]}
        type={"submit"}
        onClick={onAddToCartHandler}
      >
        Add to cart
      </button>
    </form>
  );
};

export default SizeForm;
