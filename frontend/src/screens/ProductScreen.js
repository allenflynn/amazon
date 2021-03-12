import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getProduct } from "../redux/actions";
import Loading from "../components/Loading";
import Error from "../components/Error";

const ProductScreen = (props) => {
  const [qty, setQty] = useState(1);
  const stateProduct = useSelector((state) => state.stateProduct);
  const { loading, error, product } = stateProduct;

  const dispatch = useDispatch();
  const productId = props.match.params.id;
  useEffect(() => {
    dispatch(getProduct(productId));
  }, []);

  const addToCart = () => {
    props.history.push(`/cart/${productId}?qty=${qty}`);
  };

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div>
          <Link to="/">Home</Link>
          <div className="row">
            <div className="col-2">
              <img className="large" src={product.image} />
            </div>
            <div className="col-1">
              <ul>
                <li>
                  <h1>{product.name}</h1>
                </li>
                <li>
                  <h2>${product.price}</h2>
                </li>
                <li>
                  <h2>{product.description}</h2>
                </li>
              </ul>
            </div>
            <div className="col-1">
              <div className="card">
                <div className="row">
                  {product.stock > 0 ? (
                    <>
                      <div>
                        <span className="in-scotk">In Stock</span>
                      </div>
                      <div>
                        <label htmlFor="quantity">Quantity:</label>
                        <select
                          id="quantity"
                          name="qty"
                          onChange={(e) => setQty(e.target.value)}
                        >
                          {[...Array(parseInt(product.stock)).keys()].map(
                            (el) => (
                              <option key={el + 1} value={el + 1}>
                                {el + 1}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                      <div>
                        <button onClick={addToCart}>Add to Cart</button>
                      </div>
                    </>
                  ) : (
                    <span className="out-of-stock">Out of Stock</span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductScreen;
