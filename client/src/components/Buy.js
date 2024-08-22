import React from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import './buy.css';

const Buy = ({ product }) => {
  const history = useHistory();

  const handleBuyClick = async () => {
    try {
      // Make a request to the backend to initiate the payment
      const response = await axios.post('http://localhost:8080/api/checkout', { productId: product._id });

      // Assuming the backend returns a payment URL
      if (response.data.paymentUrl) {
        window.location.href = response.data.paymentUrl; // Redirect to the payment page
      } else {
        alert('Payment URL not available');
      }
    } catch (error) {
      console.error('Error initiating payment:', error);
      alert('Error initiating payment');
    }
  };

  return (
    <div className="buy-container">
      <h2>Buy {product.name}</h2>
      <p><strong>Price:</strong> ${product.price}</p>
      <button className="buy-button" onClick={handleBuyClick}>
        Proceed to Payment
      </button>
    </div>
  );
};

export default Buy;
