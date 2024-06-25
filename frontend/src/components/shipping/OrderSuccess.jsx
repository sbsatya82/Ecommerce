import React, { useState, useEffect } from 'react';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import './OrderSuccess.css';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Country, State } from 'country-state-city';

const OrderSuccess = () => {
  const navigate = useNavigate();
  const shippingDetails = JSON.parse(sessionStorage.getItem('shippingDetails'));
  const cartDetails = JSON.parse(sessionStorage.getItem('cartDetails'));
  const [paymentInfo, setPaymentInfo] = useState(null);
  const countryName = Country.getCountryByCode(shippingDetails?.country)?.name;
  const stateDetails = State.getStateByCodeAndCountry(shippingDetails?.state, shippingDetails?.country);
  const stateName = stateDetails ? stateDetails.name : shippingDetails?.state;

  const orderItems = cartDetails?.map(item => ({
    name: item.product.name,
    quantity: item.quantity,
    price: item.product.price,
    image: item.product.images[0], // Assuming the first image is the main image
    product: item.product._id
  }));

  useEffect(() => {
    const fetchPaymentInfo = async () => {
      const cookies = document.cookie.split(';').reduce((acc, cookie) => {
        const [name, value] = cookie.trim().split('=');
        acc[name] = value;
        return acc;
      }, {});

      if (!shippingDetails || !cartDetails || !cookies.paymentInfo) {
        navigate('/');
        return;
      }

      try {
        const paymentInfoJson = decodeURIComponent(cookies.paymentInfo).slice(2);
        const paymentInfoObject = JSON.parse(paymentInfoJson);
        setPaymentInfo(paymentInfoObject.data);

        const { data } = await axios.post('/api/v1/order/new', {
          shippingInfo: {
            name: shippingDetails.name,
            address: shippingDetails.address,
            city: shippingDetails.city,
            state: stateName,
            country: countryName,
            pinCode: shippingDetails.pinCode,
            phoneNo: shippingDetails.contactNo,
          },
          orderItems: orderItems,
          paymentInfo: {
            id: paymentInfoObject.data.transactionId,
            status: paymentInfoObject.data.state
          },
          itemsPrice: sessionStorage.getItem('totalSubPrice'),
          taxPrice: sessionStorage.getItem('tax'),
          shippingPrice: 0,
          totalPrice: sessionStorage.getItem('totalPrice')
        });

        if (data.success === true) {
          console.log(data.message);
          removeCart();
          setTimeout(clearSession, 2000); // Delay execution of clearSession for 2 seconds
        }
      } catch (error) {
        console.error('Error parsing paymentInfo cookie:', error);
      }
    };

    fetchPaymentInfo();
  }, []);

  function clearSession() {
    sessionStorage.removeItem('totalSubPrice');
    sessionStorage.removeItem('tax');
    sessionStorage.removeItem('totalPrice');
    sessionStorage.removeItem('shippingDetails');
    sessionStorage.removeItem('cartDetails');
  }

  async function removeCart() {
    try {
      const { data } = await axios.get('/api/v1/cart/remove');
      if (data.success) {
        console.log(data.message);
      } else {
        console.error('Failed to remove cart:', data.error);
      }
    } catch (error) {
      console.error('Error removing cart:', error);
    }
  }

  if (!paymentInfo) {
    return <div>Loading...</div>;
  }

  return (
    <div className="order-success">
      <div className="success-message">
        <CheckCircleIcon className="success-icon animate-icon" />
        <h1>Thank You for Your Order!</h1>
        <p>Your order has been placed successfully.</p>
        <p>Order ID: {paymentInfo.merchantTransactionId}</p>
        <p>Amount: {paymentInfo.amount / 100}</p>
        <p>Transaction ID: {paymentInfo.transactionId}</p>
        <Link to='/orders' className="view-order-button">View Order</Link>
      </div>
    </div>
  );
}

export default OrderSuccess;
