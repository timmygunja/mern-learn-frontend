import "./ProductsList.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";

const ProductItem = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { id, title, description, price } = props;

  const onAddHandler = () => {
    dispatch(
      cartActions.addToCart({
        id: id,
        title: title,
        description: description,
        price: price,
      })
    );
  };

  const redirectHandler = () => {
    history.push(`/products/${id}`);
  };

  return (
    <div className="product">
      <div className="prod-pic" onClick={redirectHandler}>
        <img src={"product.png"} alt="" />
      </div>
      <div className="prod-content">
        <h1 className="prod-title">{title}</h1>
        <p className="prod-description">{description}</p>
        <p className="prod-price">{price} ₽</p>
        <button className="prod-add" onClick={onAddHandler}>
          Add
        </button>
        <button className="prod-like">Like</button>
      </div>
    </div>
  );
};

export default ProductItem;
