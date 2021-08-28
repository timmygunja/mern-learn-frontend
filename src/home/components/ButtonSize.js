import { useState } from "react";
import "./ButtonSize.css";

const ButtonSize = (props) => {
    const [customClass, setCustomClass] = useState("size-button")

    const onClickHandler = () => {
        setCustomClass("size-button-clicked")
    }

  return (
    <button className={customClass} type={"button"} onClick={onClickHandler}>
      {props.value}
    </button>
  );
};

export default ButtonSize;
