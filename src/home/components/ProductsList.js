import classes from "./ProductsList.module.css";
import ProductItem from "./ProductItem";

let isFavorite;

const ProductsList = (props) => {
  return (
    <div className={classes.maingrid}>
      {props.products.map((product) => {
        if (props.favorites) {
          isFavorite = props.favorites.includes(product.id);
        }
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            name={product.name}
            firm={product.firm}
            description={product.description}
            price={product.price}
            image={product.image}
            isFavorite={isFavorite}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
