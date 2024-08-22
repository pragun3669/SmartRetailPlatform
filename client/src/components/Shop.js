import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './Header';
import Cards from './Cards';
import { Link } from 'react-router-dom'; // Import Link for navigation
import './shop.css';
const Shop = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8080/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  return (
    <div>
      <Header /> {/* Render the header */}
      <Cards /> {/* Render the existing cards */}
      <h2>Products</h2>
      <div className="products-list">
       
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-item">
              <Link to={`/product/${product._id}`}>
                <img src={product.images} alt={product.name} style={{ width: '150px', height: '150px', cursor: 'pointer' }} />
              </Link>
              <h3>{product.name}</h3>
              <p><strong>Price:</strong> ${product.price}</p>
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Shop;
