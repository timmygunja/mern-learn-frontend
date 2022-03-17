import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import Admin from "./admin/pages/Admin";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Favourite from "./favourite/pages/Favorites";
import Home from "./home/pages/Home";
import ProductDetail from "./home/pages/ProductDetail";
import Footer from "./shared/components/footer/Footer";
import NavBar from "./shared/components/navigation/NavBar";
import { useAuth } from "./shared/hooks/auth-hook";
import { useHttpClient } from "./shared/hooks/http-hook";
import ErrorModal from "./shared/UIElements/ErrorModal";
import LoadingSpinner from "./shared/UIElements/LoadingSpinner";
import { getCartLength } from "./store/cart-slice";
import { loadFavoritesIds } from "./store/favorites-slice";
import { loadProducts } from "./store/products-slice";
import { uiActions } from "./store/ui-slice";
import Auth from "./user/pages/Auth";

function App() {
  const { token } = useAuth();
  const dispatch = useDispatch(); //
  const isLogged = useSelector((state) => state.ui.isLogged);
  // const user = useSelector((state) => state.ui.user);
  const isLoading = useSelector((state) => state.ui.isLoading); //
  const error = useSelector((state) => state.ui.error); //
  const username = useSelector((state) => state.ui.user.username);
  // const { sendRequest } = useHttpClient();

  // useEffect(() => {
  //   dispatch(loadProducts(sendRequest));
  //   if (isLogged) {
  //     dispatch(loadFavoritesIds(sendRequest, user));
  //     dispatch(getCartLength(sendRequest, user));
  //   }
  // }, [isLogged]);

  const clearError = () => {
    dispatch(uiActions.setError(null));
  };

  return (
    <div className="App">
      {isLoading && <LoadingSpinner asOverlay />}
      {<ErrorModal error={error} onClear={clearError} />}

      <Route path="/">
        <NavBar />
      </Route>

      <div className={"content"}>
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/auth">
            <Auth />
          </Route>
          <Route exact path="/products/:productId">
            <ProductDetail />
          </Route>
          <Route exact path="/admin">
            {isLogged && username === "admin" ? (
              <Admin />
            ) : (
              <div className={"hard-centered"}>
                You have no rights to this page! (url-change resets state)
              </div>
            )}
          </Route>
          {isLogged && (
            <Route exact path="/cart">
              <Cart />
            </Route>
          )}
          {isLogged && (
            <Route exact path="/favorites">
              <Favourite />
            </Route>
          )}
          <Redirect to="/"></Redirect>
        </Switch>
      </div>

      <Route path="/">
        <Footer />
      </Route>
    </div>
  );
}

export default App;
