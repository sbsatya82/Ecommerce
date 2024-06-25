import React from 'react'
import ErrorIcon from '@mui/icons-material/Error';
import './OrderFailed.css';
import { Link } from 'react-router-dom';

const OrderFailed = () => {
  return (
    <div className="order-failed">
      <div className="failure-message">
        <ErrorIcon className="failure-icon animate-icon" />
        <h1>Order Failed!</h1>
        <p>There was an issue with your payment. Please try again.</p>
        <Link to='/confirm-order' className="retry-button">Retry Payment</Link>
      </div>
    </div>
  )
}

export default OrderFailed
