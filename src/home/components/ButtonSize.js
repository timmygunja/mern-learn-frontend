import { useDispatch, useSelector } from "react-redux";
import { sizesActions } from "../../store/sizes-slice";
import classes from "./ButtonSize.module.css";

const ButtonSize = (props) => {
  const dispatch = useDispatch();
  const sizeChosen = useSelector((state) => state.sizes.sizeChosen);

  const onClickHandler = (e) => {
    e.preventDefault();
    dispatch(sizesActions.chooseSize(`${props.value}`));
  };

  return (
    <button
      className={
        sizeChosen === props.value ? classes["size-button-clicked"] : classes["size-button"]
      }
      type={"radio"}
      onClick={onClickHandler}
    >
      {props.value}
    </button>
  );
};

export default ButtonSize;
