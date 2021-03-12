import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct, removeProduct } from "../redux/actions";

const CartScreen = (props) => {
  const productId = props.match.params.id;
  const qty = props.location.search.split("=")[1];

  const { products } = useSelector((state) => state.stateCart);

  const dispatch = useDispatch();
  useEffect(() => {
    if (productId) {
      dispatch(getProduct(productId, qty));
    }
  }, []);

  const removeHandler = (id) => {
    dispatch(removeProduct(id));
  };
  const checkOutHandler = () => {
    props.history.push("/signin?redirect=shipping");
  };

  return (
    <div className="row top">
      <div className="col-2">
        <h1>My Cart</h1>
        {products.length === 0 ? (
          <div>
            Your cart is empty.
            <Link to="/">
              <button>Shop our products</button>
            </Link>
          </div>
        ) : (
          <ul>
            {products.map((el) => (
              <li key={el._id}>
                <div className="row">
                  <div>
                    <img className="small" src={el.image} alt={el.name}></img>
                  </div>
                  <div>{el.name}</div>
                  <div>${el.price}</div>
                  <div>
                    <select
                      id="quantity"
                      name="qty"
                      value={parseInt(el.quantity)}
                      onChange={(e) => {
                        dispatch(getProduct(el._id, parseInt(e.target.value)));
                      }}
                    >
                      {[...Array(parseInt(el.stock)).keys()].map((el) => (
                        <option key={el + 1} value={el + 1}>
                          {el + 1}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <button type="button" onClick={() => removeHandler(el._id)}>
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {products.length === 0 ? null : (
        <div className="col-1">
          <div className="card card-body">
            <ul>
              <li>
                <h2>
                  Total: $
                  {products.reduce(
                    (a, c) => a + parseInt(c.quantity) * parseInt(c.price),
                    0
                  )}{" "}
                </h2>
              </li>
              <li>
                <button
                  type="button"
                  onClick={checkOutHandler}
                  className="promary block"
                  disabled={products.length === 0}
                >
                  Checkout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartScreen;
