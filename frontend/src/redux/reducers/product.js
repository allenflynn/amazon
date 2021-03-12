import {
  PRODUCT_DETAIL_FAIL,
  PRODUCT_DETAIL_REQUEST,
  PRODUCT_DETAIL_SUCCESS,
} from "../actionTypes";

export default function (state = { loading: true, product: {} }, action) {
  switch (action.type) {
    case PRODUCT_DETAIL_REQUEST: {
      return state;
    }
    case PRODUCT_DETAIL_SUCCESS: {
      return { loading: false, product: action.payload };
    }
    case PRODUCT_DETAIL_FAIL: {
      return { loading: false, error: action.payload };
    }
    default:
      return state;
  }
}
