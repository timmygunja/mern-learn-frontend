import { Switch } from "react-router-dom";
import { Route } from 'react-router-dom';
import './App.css';
import MainGrid from './ui/layout/MainGrid';
import NavBar from './ui/layout/NavBar';

function App() {
  return (
    <div className="App">
      <Route path="/">
          <NavBar />
      </Route>
      
      <Switch>
        <Route exact path="/">
          <MainGrid />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
