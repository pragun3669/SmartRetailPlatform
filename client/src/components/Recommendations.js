import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; // Import Link from react-router-dom
import './recommendations.css';

function Recommendations() {
  const [searchQuery, setSearchQuery] = useState('');
  const [recommendedProducts, setRecommendedProducts] = useState([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/recommendations', {
        params: { query: searchQuery }
      });
      setRecommendedProducts(response.data);
    } catch (error) {
      console.error('Error fetching recommendations:', error);
    }
  };

  return (
    <div className="recommendations-container">
      <h2>Search for Products</h2>
      <input 
        type="text" 
        value={searchQuery} 
        onChange={(e) => setSearchQuery(e.target.value)} 
        placeholder="Enter product name..."
      />
      <button onClick={handleSearch}>Search</button>
      <div className="recommendations-list">
        {recommendedProducts.map((product) => (
          <Link to={`/product/${product._id}`} key={product._id} className="recommendation-item">
            {product.images && product.images.length > 0 ? (
              <img src={product.images[0]} alt={product.name} style={{ width: '100px', height: 'auto' }} />
            ) : (
              <div>No image available</div>
            )}
            <h3>{product.name}</h3>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Recommendations;
