import { useDispatch, useSelector } from "react-redux";
import { sizesActions } from "../../store/sizes-slice";
import "./ButtonSize.css";

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
        sizeChosen === props.value ? "size-button-clicked" : "size-button"
      }
      type={"radio"}
      onClick={onClickHandler}
    >
      {props.value}
    </button>
  );
};

export default ButtonSize;
