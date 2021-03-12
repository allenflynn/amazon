import { createStore, compose, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers";

const preloadedState = {
  stateCart: {
    products: localStorage.getItem("stateCart")
      ? JSON.parse(localStorage.getItem("stateCart"))
      : [],
  },
  stateUser: {
    user: localStorage.getItem("stateUser")
      ? JSON.parse(localStorage.getItem("stateUser"))
      : null,
  },
};
const composeEnhancers =
  (typeof window !== "undefined" &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ||
  compose;

const store = createStore(
  rootReducer,
  preloadedState,
  composeEnhancers(applyMiddleware(thunk))
);
export default store;
