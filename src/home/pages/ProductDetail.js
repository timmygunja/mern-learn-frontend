import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHttpClient } from "../../shared/hooks/http-hook";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import Section from "../../shared/UIElements/Section";
import classes from "./ProductDetail.module.css";
// import SizeForm from "../components/SizeForm";

const ProductDetail = (props) => {
  const productId = useParams().productId;
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProduct, setLoadedProduct] = useState(null);

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const loadProduct = async () => {
      try {
        const responseData = await sendRequest(
          `http://localhost:5000/api/products/${productId}`,
          "GET",
          {
            "Content-Type": "application/json",
          }
        );

        setLoadedProduct(responseData.product);
      } catch (err) {}
    };
    loadProduct();
  }, [sendRequest]);

  if (loadedProduct) {
    return (
      <>
        {isLoading && <LoadingSpinner asOverlay />}
        {<ErrorModal error={error} onClear={clearError} />}
        <Section name="Product">
          <div className={classes.product}>
            <div className={classes.mainbar}>
              <img
                className={classes["product-img"]}
                src={loadedProduct.image}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={loadedProduct.image}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={loadedProduct.image}
                alt=""
              />
              <img
                className={classes["product-img"]}
                src={loadedProduct.image}
                alt=""
              />
            </div>
            <div className={classes.sidebar}>
              <div className={classes["product-info"]}>
                <div className={classes.name}>{loadedProduct.name}</div>
                <div className={classes.price}>{loadedProduct.price} ₽</div>
                <div className={classes.firm}>{loadedProduct.firm}</div>
                <div className={classes.description}>
                  <hr />
                  <p>{loadedProduct.description}</p>
                  <hr />
                </div>
              </div>

              {/* <SizeForm
              id={product.id}
              name={product.name}
              firm={product.firm}
              description={product.description}
              price={product.price}
              isFavourite={product.isFavourite}
              size={product.size}
            /> */}
            </div>
          </div>
        </Section>
      </>
    );
  } else {
    return <h3 className={"centered"}>No such product found</h3>;
  }
};

export default ProductDetail;
