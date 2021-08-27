import { useParams } from "react-router-dom";
import classes from "./ProductDetail.module.css";

const ProductDetail = (props) => {
  const productId = useParams().productId;
  const product = props.products.find((item) => item.id === productId);

  if (product) {
    return <h3 className={"centered"}>Product with id: {productId}</h3>;
  } else {
    return (
      <div className={"flex"}>
        <h3 className={"centered"}>No such product found</h3>
      </div>
    );
  }
};

export default ProductDetail;
