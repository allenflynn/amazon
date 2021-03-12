import {
  USER_SIGNIN_REQUEST,
  USER_SIGNIN_SUCCESS,
  USER_SIGNIN_FAIL,
  USER_SIGN_OUT,
} from "../actionTypes";

export default function (state = { loading: true }, action) {
  switch (action.type) {
    case USER_SIGNIN_REQUEST: {
      return state;
    }
    case USER_SIGNIN_SUCCESS: {
      return { loading: false, user: action.payload };
    }
    case USER_SIGNIN_FAIL: {
      return { loading: false, error: action.payload };
    }
    case USER_SIGN_OUT: {
      return {};
    }
    default: {
      return state;
    }
  }
}
