import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
  PRODUCT_DETAIL_FAIL,
  CART_ADD_ITEM,
  CART_REMOVE_ITEM,
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGN_OUT,
} from "./actionTypes";

export const getProducts = () => async (dispatch) => {
  dispatch({ type: PRODUCT_LIST_REQUEST });
  try {
    const response = await axios.get("/api/products");
    const products = response.data;
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: products });
  } catch (error) {
    dispatch({ type: PRODUCT_LIST_FAIL, payload: error });
  }
};

export const getProduct = (productId, qty) => async (dispatch, getState) => {
  dispatch({ type: PRODUCT_DETAIL_REQUEST });
  try {
    const response = await axios.get(`/api/products/${productId}`);
    let product = response.data;
    if (qty) {
      let quantity = parseInt(qty);
      product = { ...product, quantity };
      dispatch({ type: CART_ADD_ITEM, payload: product });
      localStorage.setItem(
        "stateCart",
        JSON.stringify(getState().stateCart.products)
      );
    } else {
      dispatch({ type: PRODUCT_DETAIL_SUCCESS, payload: product });
    }
  } catch (error) {
    dispatch({ type: PRODUCT_DETAIL_FAIL, payload: error });
  }
};

export const removeProduct = (productId) => async (dispatch) => {
  try {
    let products = localStorage.getItem("stateCart");
    products = JSON.parse(products).filter((el) => el._id !== productId);
    localStorage.setItem("stateCart", JSON.stringify(products));
    dispatch({ type: CART_REMOVE_ITEM, payload: products });
  } catch (error) {
    console.log(error.resposne);
  }
};

export const signIn = (email, password) => async (dispatch) => {
  dispatch({ type: USER_SIGNIN_REQUEST });
  try {
    const { data } = await axios.post("/api/users/signin", { email, password });
    dispatch({ type: USER_SIGNIN_SUCCESS, payload: data });
    localStorage.setItem("stateUser", JSON.stringify(data));
  } catch (error) {
    dispatch({
      type: USER_SIGNIN_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const signOut = () => (dispatch) => {
  localStorage.removeItem("stateUser");
  dispatch({ type: USER_SIGN_OUT });
};
