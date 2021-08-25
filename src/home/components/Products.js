import "./Products.css";
import ProductItem from "./ProductItem";

const Products = () => {
  const DUMMY_PRODUCTS = [
    {
      id: 1,
      title: "product 1",
      description: "description 1",
      price: 1000,
    },
    {
      id: 2,
      title: "product 2",
      description: "description 2",
      price: 2000,
    },
    {
      id: 3,
      title: "product 3",
      description: "description 3",
      price: 1500,
    },
    {
      id: 4,
      title: "product 4",
      description: "description 4",
      price: 2300,
    },
  ];

  return (
    <div className="maingrid">
      {DUMMY_PRODUCTS.map((product) => {
        return (
          <ProductItem
            key={product.id}
            id={product.id}
            title={product.title}
            price={product.price}
            description={product.description}
          />
        );
      })}
    </div>
  );
};

export default Products;
