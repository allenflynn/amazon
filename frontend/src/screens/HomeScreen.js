import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../redux/actions";
import Product from "../components/Product";
import Loading from "../components/Loading";
import Error from "../components/Error";
import axios from "axios";

const HomeScreen = () => {
  const stateProducts = useSelector((state) => state.stateProducts);
  const { loading, error, products } = stateProducts;
  // const [products, setProducts] = useState([]);
  // const [loading, setLoading] = useState(false);
  // const [error, setError] = useState(false);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getProducts());
    // const fetchData = async () => {
    //   try {
    //     setLoading(true);
    //     const response = await axios.get("/api/products");
    //     setLoading(false);
    //     setProducts(response.data.products);
    //   } catch (error) {
    //     setError(error);
    //     setLoading(false);
    //   }
    // };
    // fetchData();
  }, []);

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <Error />
      ) : (
        <div className="row center">
          {products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeScreen;
