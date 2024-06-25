import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewCard from "./ReviewCard";
import { useDispatch, useSelector } from 'react-redux';

import './ReviewCard.css'
import { addToCart } from "../../reducers/cartSlice";

function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity,setQuantity] = useState(1)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState("S");
  const sizes = ["S", "M", "L","XL","XLL"]
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const { data } = await axios.get(`/api/v1/product/${productId}`);
        setProduct(data.product);
        setLoading(false); // Mark loading as complete
      } catch (error) {
        setError(error.message);
        setLoading(false); // Mark loading as complete with error
      }
    };

    fetchProductDetails(); // Call the async function
  }, [productId]); // useEffect will re-run whenever productId changes


  const handleSizeChange = (event) => {
    setSelectedSize(event.target.value); // Update selected size state
  };


  const handleAddToCart = async(event) => {
    event.preventDefault();
    if (!selectedSize) {
      alert("Please select a size");
      return;
    }
    try{
      const { data } = await axios.post(`/api/v1/cart/new`,{
        productId : productId,
      });
      console.log(data);
    }
    catch(error){
      console.log(error)
    }
  };



  if (loading) {
    return <p>Loading...</p>; // Display loading message while fetching data
  }

  if (error) {
    return <p>Error: {error}</p>; // Display error message if API request fails
  }

  // Render product details once data is fetched
  return (
    <section className="section product-detail">
      <div className="details container">
        <div className="left image-container">
          <div className="main">
            {product.images && product.images.length > 0 && (
              <img src={product.images[0].url} id="zoom" alt={product.name} />
            )}
          </div>
        </div>
        <div className="right">
          <h1>{product.name}</h1>
          <span>{product.category}</span>
          <br />
          <div className="price">Rs {product.price}</div>
          {/* Size selection form */}
          
          <form>
            
              <select value={selectedSize} onChange={handleSizeChange}>
                <option value="" disabled>
                  Select Size
                </option>
                {sizes.map((size) => (
                  <option key={size} value={size}>
                    {size}
                  </option>
                ))}
              </select>
              <span className="icon-container">
                <i className="bx bx-chevron-down"></i>
              </span>
              </form>
          
          {/* Render selected size */}
          {selectedSize && (
            <p style={{padding:"5px"}}>Selected Size: {selectedSize}</p>
          )}
          <form className="form"> 
            <button className="addCart" disabled={product.stock < 1? true: false} onClick={handleAddToCart}>
              Add To Cart
            </button>
          </form>
          <div>
            Status:{" "} <b className={product.stock < 1 ? "red-color": "text-primary-color"}>
              {product.stock < 1 ? "Out of stock": "In Stock "}
            </b>
          </div>
          <h3>Product Detail</h3>
          <p>
            {product.description ||
              "No description available for this product."}
          </p>
        </div>
      </div>
      <h3 className="reviewHeading">REVIEWS</h3> 
      {product.reviews && product.reviews[0] ? (
      <div className="reviews">
        {
          product.reviews && product.reviews.map((review) => <ReviewCard key={review.id} review={review}/>)
        }
      </div>): (<p className="noReviews">
        No Reviews Yet
      </p>)}
    </section>
  );
}

export default ProductDetails;
