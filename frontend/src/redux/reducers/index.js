import { combineReducers } from "redux";

import productsReducer from "./products";
import productReducer from "./product";
import cartReducer from "./cart";
import userReducer from "./user";

export default combineReducers({
  stateProducts: productsReducer,
  stateProduct: productReducer,
  stateCart: cartReducer,
  stateUser: userReducer,
});
