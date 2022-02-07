import { useState } from "react";
import classes from "./RecommendSlider.module.css";
import RecommendSliderList from "./RecommendSliderList";

const RecommendSlider = (props) => {
  const [clicked, setClicked] = useState(false);

  return (
    <div className={classes["slider-content"]}>
      <button onClick={() => {
            setClicked(true)
        }}>button</button>
      <RecommendSliderList products={props.products} />
    </div>
  );
};

export default RecommendSlider;
