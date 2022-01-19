import classes from './BuyButton.module.css';

const BuyButton = props => {
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

export default BuyButton;
