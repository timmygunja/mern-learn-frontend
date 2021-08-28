import { useParams } from "react-router-dom";
import Section from "../../shared/UIElements/Section";
import ButtonSize from "../components/ButtonSize";
import classes from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  const productId = useParams().productId;
  const product = props.products.find((item) => item.id === productId);

  if (product) {
    return (
      <Section name="Product">
        <div className={classes.product}>
          <div className={classes.mainbar}>
            <img
              className={classes["product-img"]}
              src={"../product.png"}
              alt=""
            />
            <img
              className={classes["product-img"]}
              src={"../product.png"}
              alt=""
            />
            <img
              className={classes["product-img"]}
              src={"../product.png"}
              alt=""
            />
            <img
              className={classes["product-img"]}
              src={"../product.png"}
              alt=""
            />
          </div>
          <div className={classes.sidebar}>
            <div className={classes["product-info"]}>
              <div className={classes.title}>{product.title}</div>
              <div className={classes.price}>{product.price} ₽</div>
              <div className={classes.firm}>{product.firm}</div>
              <div className={classes.description}>
                <hr />
                <p>{product.description}</p>
                <hr />
              </div>
            </div>
            <form className={classes["size-table"]}>
              <ButtonSize value={36}></ButtonSize>
              <ButtonSize value={37}></ButtonSize>
              <ButtonSize value={38}></ButtonSize>
              <ButtonSize value={39}></ButtonSize>
              <ButtonSize value={40}></ButtonSize>
              <ButtonSize value={41}></ButtonSize>
              <ButtonSize value={42}></ButtonSize>
              <ButtonSize value={43}></ButtonSize>
              <ButtonSize value={44}></ButtonSize>
              <ButtonSize value={45}></ButtonSize>
              <button className={classes["add-button"]} type={"submit"}>
                Add to cart
              </button>
              <button className={classes["like-button"]} type={"submit"}>
                Favourite
              </button>
            </form>
          </div>
        </div>
      </Section>
    );
  } else {
    return <h3 className={"centered"}>No such product found</h3>;
  }
};

export default ProductDetail;
