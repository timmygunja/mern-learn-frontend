import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Favourite from "./favourite/pages/Favourite";
import Home from "./home/pages/Home";
import ProductDetail from "./home/pages/ProductDetail";
import NavBar from "./shared/components/navigation/NavBar";
import Auth from "./user/pages/Auth";
import Profile from "./user/pages/Profile";

function App() {
  const products = useSelector((state) => state.products.items);
  const isLogged = useSelector((state) => state.ui.isLogged);

  return (
    <div className="App">
      <Route path="/">
        <NavBar />
      </Route>

      <Switch>
        <Route exact path="/">
          <Home products={products} />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products/:productId">
          <ProductDetail products={products} />
        </Route>
        <Route exact path="/favourite">
          <Favourite />
        </Route>
        <Route exact path="/auth">
          <Auth />
        </Route>
        <Route exact path="/profile">
          {console.log(isLogged)}
          {isLogged ? (
            <Profile />
          ) : (
            <div className={"hard-centered"}>You are not logged in! (url-change resets state)</div>
          )}
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
