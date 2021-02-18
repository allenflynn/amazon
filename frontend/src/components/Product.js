import React from "react";

const Product = (props) => {
  const { product } = props;
  return (
    <div key={product._id} className="card">
      <a href={`/product/${product._id}`}>
        <img className="medium" src={product.image} alt={product.name} />
        <h2>{product.name}</h2>
      </a>
      <div className="price">${product.price}</div>
    </div>
  );
};

export default Product;
