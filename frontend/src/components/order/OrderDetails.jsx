import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import './OrderView.css';
import axios from "axios";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order,setOrder] = useState();
  useEffect(() => {
    const fetchOrderDetails = async()=>{
      try {
        const {data}  = await axios.get(`/api/v1/order/${orderId}`);
        console.log(data.order);
        setOrder(data.order);
      } catch (error) {
        console.log(error);
      }
    }
    fetchOrderDetails();
  }, [orderId]);

  if (!order) {
    return <p>Loading...</p>;
  }
  return (
    <div className="container order-view-container">
      <h3>Order Details</h3>
      <div className="order-info">
        <p><strong>Order ID:</strong> {order._id}</p>
        <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
        <p><strong>Status:</strong> {order.orderStatus}</p>
      </div>

      <div className="order-items">
        <h4>Order Items</h4>
        {order.orderItems.map((item) => (
          <div key={item.product} className="order-item-details">
            <img src={`/path/to/images/${item.image}`} alt={item.name} />
            <div>
              <p>{item.name}</p>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ₹{item.price}</p>
              <p>Subtotal: ₹{item.price * item.quantity}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="shipping-info">
        <h4>Shipping Information</h4>
        <p><strong>Name:</strong> {order.shippingInfo.name}</p>
        <p><strong>Contact No:</strong> {order.shippingInfo.phoneNo}</p>
        <p><strong>Address:</strong> {order.shippingInfo.address}</p>
        <p><strong>City:</strong> {order.shippingInfo.city}</p>
        <p><strong>State:</strong> {order.shippingInfo.state}</p>
        <p><strong>Country:</strong> {order.shippingInfo.country}</p>
        <p><strong>Postal Code:</strong> {order.shippingInfo.pinCode}</p>
      </div>

      <div className="order-pricing">
        <h4>Pricing</h4>
        <p><strong>Items Price:</strong> ₹{order.itemsPrice}</p>
        <p><strong>Shipping Price:</strong> ₹{order.shippingPrice}</p>
        <p><strong>Tax Price:</strong> ₹{order.taxPrice}</p>
        <p><strong>Total Price:</strong> ₹{order.totalPrice}</p>
      </div>
      <div className="payment-info">
        <h4>Payment Info</h4>
        <p><strong>Status:</strong>{order.paymentInfo.status}</p>
      </div>
    </div>
  );
}

export default OrderDetails
