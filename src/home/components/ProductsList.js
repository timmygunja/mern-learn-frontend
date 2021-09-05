import classes from "./ProductsList.module.css";
import ProductItem from "./ProductItem";

const ProductsList = (props) => {
  return (
    <div className={classes.maingrid}>
      {props.products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            firm={product.firm}
            description={product.description}
            isFavourite={product.isFavourite}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
