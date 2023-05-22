import React from "react";
import classes from "./DeleteButton.module.css";

const DeleteButton = (props) => {
  return (
    <button
      className={classes.button}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default DeleteButton;
