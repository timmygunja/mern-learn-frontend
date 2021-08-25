import "./Products.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, description, price } = props;

  const onAddHandler = () => {
    dispatch(
      cartActions.add({
        id: id,
        title: title,
        description: description,
        price: price,
      })
    );
  };

  return (
    <div className="product">
      <div className="prod-pic">
        <img src={"product.png"} alt="" />
      </div>
      <div className="prod-content">
        <h1 className="prod-title">{title}</h1>
        <p className="prod-description">{description}</p>
        <p className="prod-price">{price} ₽</p>
        <button className="prod-add" onClick={onAddHandler}>Add</button>
        <button className="prod-like">Like</button>
      </div>
    </div>
  );
};

export default ProductItem;
