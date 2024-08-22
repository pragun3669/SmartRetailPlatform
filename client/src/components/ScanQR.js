import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './InStoreFeature.css'; // Ensure you have this CSS file for styling

const ScanQR = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

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

  const handleImageClick = (product) => {
    setSelectedProduct(product);
  };

  const closePopup = () => {
    setSelectedProduct(null);
  };

  return (
    <div>
      <h2>Products</h2>
      <div className="product-list">
        {products.length > 0 ? (
          products.map(product => (
            <div key={product._id} className="product-item">
              <img
                src={product.images}
                alt={product.name}
                style={{ width: '100px', height: '100px', cursor: 'pointer' }}
                onClick={() => handleImageClick(product)}
              />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p><strong>Price:</strong> ${product.price}</p>

              {selectedProduct && selectedProduct._id === product._id && (
                <div className="qr-popup">
                  <div className="qr-popup-content">
                    <button className="close-button" onClick={closePopup}>X</button>
                    <h3>QR Code for {product.name}</h3>
                    <QRCode value={`http://localhost:8080/api/products/${product._id}`} />
                  </div>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </div>
    </div>
  );
};

export default ScanQR;
