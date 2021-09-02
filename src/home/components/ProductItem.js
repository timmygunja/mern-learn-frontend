import "./ProductsList.css";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";

const ProductItem = (props) => {
  const { id, title, firm, description, price } = props;

  const onLikeHandler = () => {
    alert("liked");
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
        <button className="prod-like" onClick={onLikeHandler}>
          Like
        </button>
      </div>
    </div>
  );
};

export default ProductItem;
