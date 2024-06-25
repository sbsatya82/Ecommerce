import React ,{useEffect} from "react";
import Product from '../product/Product';
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProducts }  from '../../reducers/productsReducer'
import { useParams } from "react-router-dom";

const Featured = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products.products);
  let { keyword } = useParams();

  useEffect(() => {
    dispatch(fetchProducts(keyword)) // Dispatch getProducts action on component mount
  }, [dispatch,keyword]);

  return (
    <section className="section new-arrival">
      <div className="title">
        <h1>Featured</h1>
        <p>All the latest picked from designer of our store</p>
      </div>
      <div className="product-center">
      {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </section>
  );
};

export default Featured;
