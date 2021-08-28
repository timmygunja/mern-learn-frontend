import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Home from "./home/pages/Home";
import ProductDetail from "./home/pages/ProductDetail";
import NavBar from "./shared/components/navigation/NavBar";

function App() {
  const desc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."

  const DUMMY_PRODUCTS = [
    {
      id: "1",
      title: "Product 1",
      firm: "Some firm 1",
      description: desc,
      price: 1000,
    },
    {
      id: "2",
      title: "Product 2",
      firm: "Some firm 2",
      description: desc,
      price: 2000,
    },
    {
      id: "3",
      title: "Product 3",
      firm: "Some firm 3",
      description: desc,
      price: 1500,
    },
    {
      id: "4",
      title: "Product 4",
      firm: "Some firm 4",
      description: desc,
      price: 2300,
    },
  ];

  return (
    <div className="App">
      <Route path="/">
        <NavBar />
      </Route>

      <Switch>
        <Route exact path="/">
          <Home products={DUMMY_PRODUCTS} />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Route exact path="/products/:productId">
          <ProductDetail products={DUMMY_PRODUCTS} />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
