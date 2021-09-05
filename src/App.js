import { useSelector } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Favourite from "./favourite/pages/Favourite";
import Home from "./home/pages/Home";
import ProductDetail from "./home/pages/ProductDetail";
import NavBar from "./shared/components/navigation/NavBar";

function App() {
  const products = useSelector(state => state.products.items);

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
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
