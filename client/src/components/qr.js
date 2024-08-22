import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import InStoreFeature from './InStoreFeature';
import ProductDetails from './ProductDetails'; // Assuming this is your product details component

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<InStoreFeature />} />
      <Route path="/products/:id" element={<ProductDetails />} />
     
    </Routes>
  </Router>
);

export default App;
