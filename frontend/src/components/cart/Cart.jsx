import React, { useState, useEffect } from "react";
import CartItem from "./CartItem";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Cart.css'

const Cart = () => {
  const [totalSubPrice, setTotalSubPrice] = useState(0);
  const [tax, setTax] = useState(0);
  const [totalPrice ,setTotalPrice] = useState(0);
  const { cartItems } = useSelector((state) => state.cart);
  const navigate = useNavigate()

  useEffect(() => {
    const subTotal = cartItems.reduce((acc, item) => acc + item.quantity * item.product.price, 0);
    setTotalSubPrice(subTotal);
    const calculatedTax = subTotal * 0;
    setTax(calculatedTax);
    const total = subTotal + calculatedTax;
    setTotalPrice(total);

  }, [cartItems]);


  const handleCheckout = () => {
    sessionStorage.setItem('cartDetails', JSON.stringify(cartItems));
    sessionStorage.setItem('totalSubPrice', totalSubPrice);
    sessionStorage.setItem('tax', tax);
    sessionStorage.setItem('totalPrice', totalPrice);
    navigate('/shipping');
  };


  return (
    <div className="container cart-container">
      <h3>Shopping Cart</h3>
      {cartItems.length === 0 ? (
        <p>Cart is empty</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((product) => (
              <CartItem key={product._id} product={product} />
            ))}
          </tbody>
        </table>
      )}
      {cartItems.length > 0 && (
        <div className="total-price">
          <table id="price-table">
            <tbody>
              <tr>
                <td>Subtotal</td>
                <td>{totalSubPrice}</td>
              </tr>
              <tr>
                <td>Tax</td>
                <td>{tax}</td>
              </tr>
              <tr>
                <td>Total</td>
                <td>{totalPrice}</td>
              </tr>
            </tbody>
          </table>
          <button className="checkout btn" onClick={handleCheckout}>
            Buy Now
          </button>
        </div>
      )}
    </div>
  );
};

export default Cart;
