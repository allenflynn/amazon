import logo from "./logo.svg";
import "./App.css";
import data from "./data";
import Product from "./components/Product";
import { BrowserRouter as Router, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";

function App() {
  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <a href="/">Amazon</a>
          </div>
          <div>
            <a href="/cart.html">Cart</a>
            <a href="/signin.html">Sign In</a>
          </div>
        </header>
        <main>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
