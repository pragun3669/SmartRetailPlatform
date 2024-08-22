import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './signup.css';

const Signup = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Hook for navigation

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/auth/signup', { username, email, password })
      .then(response => {
        alert('Signup successful');
        navigate('/login'); // Redirect to login page after successful signup
      })
      .catch(error => {
        console.error('Error signing up:', error);
      });
  };

  return (
    <div className="container">
      <div className="signup-form">
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Username:
            <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
          </label>
          <label>
            Email:
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
          </label>
          <label>
            Password:
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
          </label>
          <p>
          Already have an account? <a href="/login">Login here</a>
        </p>
          <button type="submit">Signup</button>
        </form>
      </div>
    </div>
  );
};

export default Signup;
