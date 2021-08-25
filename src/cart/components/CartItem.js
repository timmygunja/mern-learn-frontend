const CartItem = (props) => {
  const { id, title, description, price } = props.item;

  return (
    <li className="product">
      <div className="prod-pic">
        <img src={"product.png"} alt="" />
      </div>
      <div className="prod-content">
        <h1 className="prod-title">{title}</h1>
        <p className="prod-description">{description}</p>
        <p className="prod-price">{price} ₽</p>
        <button className="prod-add">+</button>
        <button className="prod-like">-</button>
      </div>
    </li>
  );
};

export default CartItem;
