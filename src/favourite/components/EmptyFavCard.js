import { Link } from "react-router-dom";
import classes from "./EmptyFavCard.module.css";

const EmptyFavCard = (props) => {
  return (
    <Link to={"/"} className={classes.product}>
      <div className={classes["prod-pic"]}>
        <img src={"product.png"} alt="" />
      </div>
      <div className={classes["prod-content"]}>
        <div className={classes["prod-title"]}>No products in favourites found</div>
      </div>
    </Link>
  );
};

export default EmptyFavCard;
