import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";

const Home = () => {
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [loadedProducts, setLoadedProducts] = useState(null);

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const loadProducts = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/products",
          "GET",
          {
            "Content-Type": "application/json",
          }
        );

        setLoadedProducts(responseData.products);
      } catch (err) {}
    };
    loadProducts();
  }, [sendRequest]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}
      {loadedProducts && <ProductsList products={loadedProducts} />}
    </>
  );
};

export default Home;
