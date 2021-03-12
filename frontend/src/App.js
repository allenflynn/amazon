import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ProductScreen from "./screens/ProductScreen";
import CartScreen from "./screens/CartScreen";
import SigninScreen from "./screens/SigninScreen";
import ShippingScreen from "./screens/ShippingScreen";
import { useDispatch, useSelector } from "react-redux";

import { signOut } from "./redux/actions";

function App() {
  const { products } = useSelector((state) => state.stateCart);
  const { user } = useSelector((state) => state.stateUser);

  const dispatch = useDispatch();
  const signOutHandler = () => {
    dispatch(signOut());
  };

  return (
    <Router>
      <div className="grid-container">
        <header className="row">
          <div>
            <Link to="/">Amazon</Link>
          </div>
          <div>
            <Link to="/cart">
              Cart
              {products.length > 0 && (
                <span className="badge">
                  {products.reduce(
                    (accumulator, currentValue) =>
                      accumulator + currentValue.quantity,
                    0
                  )}
                </span>
              )}
            </Link>
            {user ? (
              <div className="dropdown">
                <Link to="#">{user.name}</Link>
                <ul class="sign-out">
                  <Link to="#signout" onClick={signOutHandler}>
                    Sign out
                  </Link>
                </ul>
              </div>
            ) : (
              <Link to="/signin">Sign In</Link>
            )}
          </div>
        </header>
        <main>
          <Route path="/" exact>
            <HomeScreen />
          </Route>
          <Route path="/signin" component={SigninScreen}></Route>
          <Route path="/shipping" component={ShippingScreen}></Route>
          <Route path="/product/:id" component={ProductScreen}></Route>
          <Route path="/cart/:id?" component={CartScreen}></Route>
        </main>
        <footer className="row center">All right reserved</footer>
      </div>
    </Router>
  );
}

export default App;
