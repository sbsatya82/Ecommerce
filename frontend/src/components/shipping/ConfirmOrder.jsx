import React,{useState} from 'react';
import { useNavigate } from 'react-router-dom';
import './ConfirmOrder.css';
import axios from 'axios';
import { Country, State } from 'country-state-city';

const ConfirmOrder = () => {
  const navigate = useNavigate();
  const shippingDetails = JSON.parse(sessionStorage.getItem('shippingDetails'));
  const cartDetails = JSON.parse(sessionStorage.getItem('cartDetails'));
  const totalSubPrice = sessionStorage.getItem('totalSubPrice');
  const tax = sessionStorage.getItem('tax');
  const totalPrice = sessionStorage.getItem('totalPrice');
  const [isProcessing, setIsProcessing] = useState(false);

  React.useEffect(() => {
    if (!shippingDetails) {
      navigate('/shipping');
    }
  }, [shippingDetails, navigate]);

  if (!shippingDetails || !cartDetails) {
    return null;
  }

  const orderHandler = async(e)=>{
    e.preventDefault();
    setIsProcessing(true);
    try{
      const {data} = await axios.post('/api/v1/createOrder', {
        amount: totalPrice,
        orderId: `order_${Date.now()}`,
        name : shippingDetails.name,
        contactNo: shippingDetails.contactNo,
        MUID:`M_${Date.now()}`,
      });
      console.log('Payment initiation response:', data);
      if (data && data.data.instrumentResponse.redirectInfo.url) {
        window.location.href = data.data.instrumentResponse.redirectInfo.url;
      }
    }catch (error) {
      console.error('Error initiating payment:', error);
      setIsProcessing(false);
    }
  }

  const countryName = Country.getCountryByCode(shippingDetails.country)?.name;
  const stateDetails = State.getStateByCodeAndCountry(shippingDetails.state, shippingDetails.country);
  const stateName = stateDetails ? stateDetails.name : shippingDetails.state;
  return (
    <div className="container">
      <h2>Confirm Order</h2>
      <div className="order-details">
        <h3>Shipping Details</h3>
        <p><strong>Name:</strong> {shippingDetails.name}</p>
        <p><strong>Contact No:</strong> {shippingDetails.contactNo}</p>
        <p><strong>Address:</strong> {shippingDetails.address}</p>
        <p><strong>Country:</strong> {countryName}</p>
        <p><strong>State:</strong> {stateName}</p>
        <p><strong>City:</strong> {shippingDetails.city}</p>
        <p><strong>Pin Code:</strong> {shippingDetails.pinCode}</p>
      </div>
      <div className="cart-details">
        <h3>Cart Items</h3>
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Quantity</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {cartDetails.map((item) => (
              <tr key={item._id}>
                <td>{item.product.name}</td>
                <td>{item.quantity}</td>
                <td>{item.quantity * item.product.price}</td>
              </tr>
            ))}
          </tbody>
        </table>
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
        </div>
      </div>
      <button onClick={orderHandler} disabled={isProcessing}>Confirm Order</button>
    </div>
  );
};

export default ConfirmOrder;
