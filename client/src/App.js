import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from './components/Home';
import Shop from './components/Shop';
import InStoreFeature from './components/InStoreFeature';
import ScanQR from './components/ScanQR';
import ProductDetails from './components/ProductDetails';
import Signup from './components/signup'; // Ensure file name matches
import Login from './components/login';   // Ensure file name matches
import Cart from './components/cart';     // Add Cart page
import PopupChatbot from './components/PopupChatbot';
import Recommendations from './components/Recommendations';
import  VirtualTryOn from './components/VirtualTryOn';
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/in-store" element={<InStoreFeature />} />
        <Route path="/in-store/scan-qr" element={<ScanQR />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cart" element={<Cart />} /> {/* Added Cart route */}
        <Route path="/recommendations" element={<Recommendations />} />
        <Route path="/virtual-try-on" element={< VirtualTryOn/>} />
      </Routes>
      <PopupChatbot />
    </Router>
  );
}

export default App;

