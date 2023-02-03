import classes from "./ProductItem.module.css";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { useState } from "react";
import env from "../env";

const ProductItem = (props) => {
  const { sendRequest } = useHttpClient();
  const { id, name, firm, price, image } = props;
  let { isFavorite } = props;
  const user = useSelector((state) => state.ui.user);

  const [likeClass, setLikeClass] = useState(
    isFavorite ? classes["prod-like-active"] : classes["prod-like"]
  );

  // console.log(name);
  // console.log("is favorite:", isFavorite);
  // console.log("className", likeClass);
  // console.log();

  const onLikeHandler = async (event) => {
    event.preventDefault();
    if (!isFavorite) {
      try {
        await sendRequest(
          // `http://localhost:5000/api/favorites/${id}`,
          env.BASE_URL + `/api/favorites/${id}`,
          "POST",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );

        setLikeClass(classes["prod-like-active"]);
        props.isFavorite = true;
        console.log("LIKED PRODUCT");
      } catch (error) {}
    } else {
      try {
        await sendRequest(
          // `http://localhost:5000/api/favorites/${id}`,
          env.BASE_URL + `/api/favorites/${id}`,
          "DELETE",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );

        setLikeClass(classes["prod-like"]);
        props.isFavorite = false;
        console.log("DISLIKED");
      } catch (error) {}
    }
    console.log(isFavorite);
  };

  return (
    <>
      <div className={classes.product}>
        <Link to={`/products/${id}`} className={classes["prod-pic"]}>
          <img
            // src={`http://localhost:5000/${image}`}
            src={env.BASE_URL + `${image}`}
            alt=""
          />
        </Link>
        <div className={classes["prod-content"]}>
          <h1 className={classes["prod-name"]}>{name}</h1>
          <p className={classes["prod-firm"]}>{firm}</p>
          <p className={classes["prod-price"]}>{price} ₽</p>
          <button
            // className={
            //   isFavorite ? classes["prod-like-active"] : classes["prod-like"]
            // }
            className={likeClass}
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
