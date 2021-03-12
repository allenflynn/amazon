import { CART_ADD_ITEM, CART_REMOVE_ITEM } from "../actionTypes";

export default function (state = { products: [] }, action) {
  switch (action.type) {
    case CART_ADD_ITEM:
      const product = action.payload;
      const productExist = state.products.find((el) => el._id === product._id);
      if (productExist) {
        const products = state.products.map((el) =>
          el._id === product._id
            ? {
                ...el,
                quantity: product.quantity,
              }
            : el
        );
        return { products };
      } else {
        return { products: state.products.concat(product) };
      }
    case CART_REMOVE_ITEM:
      const products = action.payload;
      return { products };
    default:
      return state;
  }
}
