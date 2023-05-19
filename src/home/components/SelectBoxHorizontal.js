import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { loadFilteredProducts } from "../../store/products-slice";
import classes from "./SelectBoxHorizontal.module.css";

const SelectBoxHorizontal = (props) => {
  const [chosenOption, setChosenOption] = useState("Популярное");
  const [selectClass, setSelectClass] = useState("select-option-hidden");
  const [arrowClass, setArrowClass] = useState("select-arrow-hidden");
  const dispatch = useDispatch();
  const { sendRequest } = useHttpClient();
  let opt;

  const showOptionHandler = (props) => {
    if (selectClass === "select-option") {
      setSelectClass("select-option-hidden");
    } else {
      setSelectClass("select-option");
    }
    if (arrowClass === "select-arrow-hidden") {
      setArrowClass("select-arrow-open");
    } else {
      setArrowClass("select-arrow-hidden");
    }
  };

  const optionHandler = (props) => {
    opt = props.target.innerText;
    setChosenOption(opt);

    if (opt === "Популярное") {
      opt = "Popular";
    } else if (opt === "Лучшее") {
      opt = "Liked";
    } else if (opt === "Бестселлер") {
      opt = "Bestseller";
    }

    dispatch(loadFilteredProducts(sendRequest, opt));
    setSelectClass("select-option-hidden");
    setArrowClass("select-arrow-hidden");
  };

  return (
    <div className={classes["outer-box"]}>
      <div
        className={classes["select-option-chosen"]}
        onClick={showOptionHandler}
      >
        <p className={classes["select-option-text"]}>{chosenOption}</p>
        <div className={classes[arrowClass]}>
          <img src="select arrow.svg" />
        </div>
      </div>
      <div className={classes[selectClass]} onClick={optionHandler}>
        {/* Popular */}
        Популярное
      </div>
      <div className={classes[selectClass]} onClick={optionHandler}>
        {/* Liked */}
        Лучшее
      </div>
      <div className={classes[selectClass]} onClick={optionHandler}>
        {/* Bestseller */}
        Бестселлер
      </div>
    </div>
  );
};

export default SelectBoxHorizontal;
