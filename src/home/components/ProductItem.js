import "./ProductsList.css";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const dispatch = useDispatch();
  const { id, title, firm, description, price } = props;

  const onAddHandler = () => {
    dispatch(
      cartActions.addToCart({
        id: id,
        title: title,
        firm: firm,
        description: description,
        price: price,
      })
    );
  };

  return (
    <div className="product">
      <Link to={`/products/${id}`} className="prod-pic">
        <img src={"product.png"} alt="" />
      </Link>
      <div className="prod-content">
        <h1 className="prod-title">{title}</h1>
        <p className="prod-firm">{firm}</p>
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
