import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";

const Home = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [loadedProducts, setLoadedProducts] = useState(null);

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const sendRequest = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("htpp://localhost:5000/api/products");

        const responseData = await response.json();
        if (!responseData.ok) {
          throw new Error(responseData.message);
        }

        setLoadedProducts(responseData.products);
      } catch (err) {
        setError(err.message);
      }
      setIsLoading(false);
    };
    sendRequest();
  }, []);

  return (
    <>
      <ProductsList products={props.products} />
    </>
  );
};

export default Home;
