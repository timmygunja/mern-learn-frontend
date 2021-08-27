import ProductsList from "../components/ProductsList";

const Home = (props) => {
  return (
    <>
      <ProductsList products={props.products} />
    </>
  );
};

export default Home;
