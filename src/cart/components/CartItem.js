import classes from "./CartItem.module.css";

const CartItem = (props) => {
  const { id, title, description, price, quantity } = props.item;

  return (
    <li className={classes.product}>
      <div className={classes['prod-pic']}>
        <img src={"product.png"} alt="" />
      </div>
      <div className={classes['prod-content']}>
        <h1 className={classes['prod-title']}>{title}</h1>
        <p className={classes['prod-description']}>{description}</p>
        <p className={classes['prod-price']}>{price} ₽</p>
        <button className={classes['prod-remove']}>-</button>
        <p className={classes['prod-quantity']}>Quantity: {quantity}</p>
        <button className={classes['prod-add']}>+</button>
      </div>
    </li>
  );
};

export default CartItem;
