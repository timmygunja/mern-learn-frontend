import { Switch, Route, Redirect } from "react-router-dom";
import "./App.css";
import Cart from "./cart/pages/Cart";
import Home from "./home/pages/Home";
import NavBar from "./shared/components/navigation/NavBar";

function App() {
  return (
    <div className="App">
      <Route path="/">
        <NavBar />
      </Route>
      
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/cart">
          <Cart />
        </Route>
        <Redirect to="/"></Redirect>
      </Switch>
    </div>
  );
}

export default App;
