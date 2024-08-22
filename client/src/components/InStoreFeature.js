import React, { useState, useEffect } from 'react';
import axios from 'axios';
import QRCode from 'qrcode.react';
import './InStoreFeature.css';

const InStoreFeature = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [qrCodeData, setQrCodeData] = useState('');

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:8080/api/products')
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleImageClick = (product) => {
    setSelectedProduct(product);
    setQrCodeData(`http://localhost:3000/products/${product._id}`); // URL to product details page
  };

  return (
    <div className="instore-feature">
      <h2>In-Store Features</h2>
      <div className="product-gallery">
        {products.map((product) => (
          <div
            key={product._id}
            className="product-item"
            onClick={() => handleImageClick(product)}
          >
            <img src={product.images} alt={product.name} />
            <p>{product.name}</p>
          </div>
        ))}
      </div>
      {selectedProduct && (
        <div className="product-details">
          <h3>Product Details</h3>
          <img src={selectedProduct.images} alt={selectedProduct.name} />
          <p><strong>Name:</strong> {selectedProduct.name}</p>
          <p><strong>Description:</strong> {selectedProduct.description}</p>
          <p><strong>Price:</strong> ${selectedProduct.price}</p>
          <p><strong>Category:</strong> {selectedProduct.category}</p>
          <p><strong>Tags:</strong> {selectedProduct.tags.join(', ')}</p>
          <div className="qr-code">
            <h3>Scan this QR Code to view product details:</h3>
            <QRCode value={qrCodeData} />
          </div>
        </div>
      )}
    </div>
  );
};

export default InStoreFeature;
