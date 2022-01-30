import { useEffect, useState } from "react";
import ProductsList from "../components/ProductsList";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner";
import ErrorModal from "../../shared/UIElements/ErrorModal";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { cartActions } from "../../store/cart-slice";
import { useDispatch, useSelector } from "react-redux";

const Home = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.ui.user);
  const isLogged = useSelector((state) => state.ui.isLogged);
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

  useEffect(() => {
    // async lower because useEffect async is a bad practice
    const getCartLength = async () => {
      try {
        const responseData = await sendRequest(
          "http://localhost:5000/api/cart/getCartLength",
          "GET",
          {
            "Content-Type": "application/json",
            Authorization: "Bearer " + user.token,
            Username: user.username,
          }
        );

        dispatch(cartActions.setTotalCartCount(responseData.cartLength));
      } catch (err) {}
    };

    isLogged && getCartLength();
  }, [sendRequest, user]);

  return (
    <>
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}
      {loadedProducts && <ProductsList products={loadedProducts} />}
    </>
  );
};

export default Home;
