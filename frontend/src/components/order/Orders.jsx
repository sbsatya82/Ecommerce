import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Orders.css';

const Orders = () => {

  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    
    const fetchOrders = async () => {
      try {
        const {data} = await axios.get('/api/v1/orders/me');
        console.log(data);
        setOrders(data.orders);
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchOrders();
  }, []);

  const handleViewOrder = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  return (
    <div className="container orders-container">
    <h3>My Orders</h3>
    {orders.length === 0 ? (
      <p>No orders found</p>
    ) : (
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-item">
            <div className="order-info">
              <div>
                <p><strong>Order ID:</strong> {order._id}</p>
                <p><strong>Date:</strong> {new Date(order.createdAt).toLocaleDateString()}</p>
                <p><strong>Total:</strong> ₹{order.totalPrice}</p>
                <p><strong>Status:</strong> {order.orderStatus}</p>
                <button onClick={() => handleViewOrder(order._id)}>View</button>
              </div>
            </div>
            <div className="order-items">
              {order.orderItems.map((item) => (
                <div key={item.product} className="order-item-details">
                  <img src={item.image[0].url} alt={item.name} />
                  <div>
                    <p>{item.name}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Price: ₹{item.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
);
};

export default Orders;
