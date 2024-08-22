import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css'; // Import the CSS file

function Header() {
  return (
    <header className="header">
      <nav className="nav">
        <ul className="nav-list">
          <li className="nav-item"><Link to="/" className="nav-link">Home</Link></li>
          <li className="nav-item"><Link to="/login" className="nav-link">Login</Link></li>
          <li className="nav-item"><Link to="/signup" className="nav-link">Sign Up</Link></li>
          <li className="nav-item cart-icon">
            <Link to="/cart" className="nav-link">
              <span className="icon">&#128722;</span> {/* Cart icon */}
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
