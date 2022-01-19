import classes from './LikeButton.module.css';

const LikeButton = props => {
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

export default LikeButton;
