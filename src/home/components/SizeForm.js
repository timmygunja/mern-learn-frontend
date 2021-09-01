import { useSelector } from "react-redux";
import ButtonSize from "./ButtonSize";
import classes from "./SizeForm.module.css";

const SizeForm = () => {
  const sizeList = useSelector((state) => state.sizes.sizeList);
  const sizeChosen = useSelector((state) => state.sizes.sizeChosen);

  const onLikeHandler = (e) => {
    e.preventDefault();
  };

  const onAddToCartHandler = (e) => {
    e.preventDefault();
    console.log(`last chosen size is ${sizeChosen}`);
  };

  return (
    <form
      className={classes["size-table"]}
    >
      
      {sizeList.map(size => {
        return <ButtonSize key={size} value={size}></ButtonSize>
      })}

      <button
        className={classes["like-button"]}
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
