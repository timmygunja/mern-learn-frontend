import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";

const ProductItem = (props) => {
  const { sendRequest } = useHttpClient();
  const { id, name, firm, price, image, isFavourite } = props;
  const user = useSelector((state) => state.ui.user);

  const onLikeHandler = async (event) => {
    event.preventDefault();
    try {
      await sendRequest(`http://localhost:5000/api/favorites/${id}`, "POST", {
        "Content-Type": "application/json",
        Authorization: "Bearer " + user.token,
        Username: user.username,
      });
    } catch (error) {}
  };

  return (
    <>
      <div className={classes.product}>
        <Link to={`/products/${id}`} className={classes["prod-pic"]}>
          <img src={`http://localhost:5000/${image}`} alt="" />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>
          <button
            className={
              isFavourite ? classes["prod-like-active"] : classes["prod-like"]
            }
            onClick={onLikeHandler}
          >
            Like
          </button>
        </div>
      </div>
    </>
  );
};

export default ProductItem;
