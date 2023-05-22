import React from 'react';
import classes from './EditButton.module.css';

const EditButton = props => {
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

export default EditButton;
