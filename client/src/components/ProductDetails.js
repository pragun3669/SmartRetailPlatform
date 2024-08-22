
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import Axios
import { toast } from 'react-toastify'; // Import toast for notifications

import './shop.css';

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const { id } = useParams(); // Get the product ID from the URL
  const navigate = useNavigate(); // Initialize useNavigate for navigation

  useEffect(() => {
    // Fetch the product details using Axios
    axios.get(`http://localhost:8080/api/products/${id}`)
      .then(response => setProduct(response.data))
      .catch(error => {
        console.error('Error fetching product details:', error);
        toast.error('Failed to fetch product details.');
      });
  }, [id]);

const handleAddToCart = async () => {
  try {
    const response = await axios.post(
      'http://localhost:8080/api/cart/add',
      { productId: product._id },
      { withCredentials: true } // Include credentials (cookies) in the request
    );
    toast.success(response.data.message); // Notify user of success
    navigate('/cart'); // Redirect to cart page
  } catch (error) {
    console.error('Error adding to cart:', error.response ? error.response.data : error);
    toast.error('Failed to add item to cart. Please try again.');
  }
};
  return (
    <div className="product-details">
      {product ? (
        <div>
          <h2>{product.name}</h2>
          <img src={product.images} alt={product.name} style={{ width: '300px', height: '300px' }} />
          <p><strong>Description:</strong> {product.description}</p>
          <p><strong>Price:</strong> ${product.price}</p>
          <p><strong>Category:</strong> {product.category}</p>
          <p><strong>Tags:</strong> {product.tags.join(', ')}</p>
          
          <button className="add-to-cart-button" onClick={handleAddToCart}>
            BUY
          </button>
        </div>
      ) : (
        <p>Loading product details...</p>
      )}
    </div>
  );
};

export default ProductDetails;
