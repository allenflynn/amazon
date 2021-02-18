import React from "react";
import data from "../data";
import { Link } from "react-router-dom";

const ProductScreen = (props) => {
  const product = data.products.find((el) => el._id == props.match.params.id);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
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
            <div>
              Status:
              {product.stock > 0 ? (
                <span className="in-scotk">In Stock</span>
              ) : (
                <span className="out-of-stock">Out of Stock</span>
              )}
            </div>
            <button>Add to Cart</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductScreen;
