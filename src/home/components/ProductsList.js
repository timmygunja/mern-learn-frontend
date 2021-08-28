import "./ProductsList.css";
import ProductItem from "./ProductItem";

const ProductsList = (props) => {
  return (
    <div className="maingrid">
      {props.products.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            firm={product.firm}
            description={product.description}
          />
        );
      })}
    </div>
  );
};

export default ProductsList;
