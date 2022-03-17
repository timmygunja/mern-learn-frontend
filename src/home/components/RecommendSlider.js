import { useState } from "react";
import classes from "./RecommendSlider.module.css";
import RecommendSliderList from "./RecommendSliderList";
import SelectBoxHorizontal from "./SelectBoxHorizontal";

let currentIndex = 0;
let leftConstraint = 0;
let rightConstraint = 2;

const RecommendSlider = (props) => {
  const [leftButtonHidden, setLeftButtonHidden] = useState(true);
  const [rightButtonHidden, setRightButtonHidden] = useState(false);
  const [scrollAmount, setScrollAmount] = useState(0);
  const style = { transform: `translateX(${scrollAmount}vw)` };

  const leftArrowHandler = (event) => {
    event.preventDefault();
    setScrollAmount(scrollAmount + 28);
    currentIndex -= 1;
    if (currentIndex === leftConstraint) {
      setLeftButtonHidden(true);
    }
    if (currentIndex <= rightConstraint) {
      setRightButtonHidden(false);
    }
  };

  const rightArrowHandler = (event) => {
    event.preventDefault();
    setScrollAmount(scrollAmount - 28);
    currentIndex += 1;
    if (currentIndex > leftConstraint) {
      setLeftButtonHidden(false);
    }
    if (currentIndex >= rightConstraint) {
      setRightButtonHidden(true);
    }
  };

  return (
    <div className={classes["slider"]}>
      <div className={classes["tool-box"]}>
        <div className={classes["group-box"]}>
          <SelectBoxHorizontal />
        </div>
        <div className={classes["button-box"]}>
          <button
            className={
              leftButtonHidden ? classes["btn-hidden"] : classes["arrow-button"]
            }
            onClick={leftArrowHandler}
          >
            {"<"}
          </button>
          <button
            className={
              rightButtonHidden
                ? classes["btn-hidden"]
                : classes["arrow-button"]
            }
            onClick={rightArrowHandler}
          >
            {">"}
          </button>
        </div>
      </div>
      <div className={classes["slider-content"]}>
        <RecommendSliderList
          products={props.products}
          favorites={props.favorites}
          style={style}
          className={classes["slider-list"]}
        />
      </div>
    </div>
  );
};

export default RecommendSlider;
