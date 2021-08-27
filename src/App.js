import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Home from "./home/pages/Home";
import ProductDetail from "./home/pages/ProductDetail";
import NavBar from "./shared/components/navigation/NavBar";

function App() {
  const DUMMY_PRODUCTS = [
    {
      id: "1",
      title: "product 1",
      description: "description 1",
      price: 1000,
    },
    {
      id: "2",
      title: "product 2",
      description: "description 2",
      price: 2000,
    },
    {
      id: "3",
      title: "product 3",
      description: "description 3",
      price: 1500,
    },
    {
      id: "4",
      title: "product 4",
      description: "description 4",
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
