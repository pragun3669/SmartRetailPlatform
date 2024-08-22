import React from 'react';
import axios from 'axios';

const AddToCartButton = ({ productId }) => {
  const handleAddToCart = () => {
    const userId = 'YOUR_USER_ID'; // Replace with dynamic user ID
    const quantity = 1; // Set desired quantity

    axios.post('http://localhost:8080/api/cart/add', { userId, productId, quantity })
      .then(response => {
        console.log('Product added to cart:', response.data);
        alert('Added to cart');
      })
      .catch(error => {
        console.error('Error adding product to cart:', error);
      });
  };

  return (
    <button onClick={handleAddToCart}>Add to Cart</button>
  );
};

export default AddToCartButton;
