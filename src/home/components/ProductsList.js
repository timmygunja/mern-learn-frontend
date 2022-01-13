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
            name={product.name}
            firm={product.firm}
            description={product.description}
            price={product.price}
            image={product.image}
            isFavourite={product.isFavourite}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
