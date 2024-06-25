import React ,{useEffect} from "react";
import Product from "./Product";
import { useDispatch, useSelector } from 'react-redux';
import  { fetchProducts }  from '../../reducers/productsReducer'
import { useParams } from "react-router-dom";
import './ReviewCard.css';




const ProductList = () => {
  const dispatch = useDispatch();
  const { status, error } = useSelector((state) => state.products);
  const { products } = useSelector((state) => state.products.products);

  let { keyword } = useParams();



  useEffect(() => {
    dispatch(fetchProducts(keyword)) // Dispatch getProducts action on component mount
  }, [dispatch,keyword]);


  
  if (status === 'loading') {
    return <div>Loading products...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }
  return (
    <>
      <div className="product-center container">
        {products &&
          products.map((product) => (
            <Product key={product._id} product={product} />
          ))}
      </div>
    </>
  );
};

export default ProductList;
