import React from "react";
import {Link} from "react-router-dom"


const Product = ({product}) => {

  const {
    _id,
    name,
    price,
    ratings,
    images,
    category
  } = product



  const handleAddToWishList = () => {};
  const handleAddToBag = () => {};

  return (
    <>
        <Link className="product-item" to={`/product/${_id}`}>
          <div className="overlay">
            <div
              className="product-thumb"
            >
              <img
                src={images[0].url}
                alt=""
              />
            </div>
            {20 && (
              <span className="discount">20%</span>
            )}
          </div>
          <div className="product-info">
            <span>{category}</span>
            <Link to={`/product/${_id}`}>
              {name}
            </Link>
            <h4>{price}</h4>
          </div>
          <ul className="icons">
            <li>
              <i className="bx bx-heart" onClick={handleAddToWishList}></i>
            </li>
            <li>
              <i className="bx bx-cart" onClick={handleAddToBag}></i>
            </li>
          </ul>
        </Link>
    </>
  );
};




export default Product;
