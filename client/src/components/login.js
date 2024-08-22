import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/auth/login', { email, password })
      .then(response => {
        localStorage.setItem('token', response.data.token); // Store token in local storage
        alert('Login successful');
        navigate('/shop'); // Redirect to shop page after successful login
      })
      .catch(error => {
        console.error('Error logging in:', error);
      });
  };

  return (
    <div className="container">
      <div className="login-form">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <button type="submit">Login</button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Signup here</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
