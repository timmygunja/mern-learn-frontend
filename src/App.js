import { useSelector } from "react-redux";
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
import Auth from "./user/pages/Auth";

function App() {
  const isLogged = useSelector((state) => state.ui.isLogged);
  const username = useSelector((state) => state.ui.user.username);
  const { token } = useAuth();

  return (
    <div className="App">
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
          {token && (
            <Route exact path="/cart">
              <Cart />
            </Route>
          )}
          {token && (
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
