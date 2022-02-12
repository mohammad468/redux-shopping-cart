import React, { useEffect } from "react";

// Components
import Product from "./shared/Product";

// redux
import { useSelector, useDispatch } from "react-redux";
import { fetchProducts } from "../redux/products/productsAction";
import { Spinner } from "react-bootstrap";
// Style
import styles from "./Store.module.css";

const Store = () => {
  const dispatch = useDispatch();
  const productsData = useSelector((state) => state.productsState);

  useEffect(() => {
    if (!productsData.products.length) {
      dispatch(fetchProducts());
    }
  }, []);

  return (
    <div className={styles.container}>
      {productsData.loading ? (
        <div className="d-flex justify-content-center w-100">
          <Spinner animation="grow" variant="info" />
        </div>
      ) : productsData.error ? (
        <p>this is error</p>
      ) : (
        productsData.products.map((product) => (
          <Product key={product.id} productData={product} />
        ))
      )}
    </div>
  );
};

export default Store;
