import classes from './NeonButton.module.css';

const NeonButton = props => {
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

export default NeonButton;
