import { useParams } from "react-router-dom";
import Section from "../../shared/UIElements/Section";
import classes from "./ProductDetail.module.css";
// import SizeForm from "../components/SizeForm";

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

            {/* <SizeForm
              id={product.id}
              title={product.title}
              firm={product.firm}
              description={product.description}
              price={product.price}
              isFavourite={product.isFavourite}
              size={product.size}
            /> */}
          </div>
        </div>
      </Section>
    );
  } else {
    return <h3 className={"centered"}>No such product found</h3>;
  }
};

export default ProductDetail;
