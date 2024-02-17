// LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css'; // Import CSS file for styling
import axios from 'axios';
import { login } from './api'; // Import the login function from api.js

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Call the login function from api.js
      await login(email, password);
      // Redirect to the dashboard upon successful login
      console.log('Login successful');
      showSuccessPopup();
      setEmail('');
      setPassword('');
      navigate('/dashboard');
    } catch (error) {
      console.error('Login failed:', error);
      // Handle login error
      alert('Login failed. Please check your credentials and try again.');
    }
  };

  const goToFileUploadPage = () => {
    navigate('/fileupload');
  };

  const handleForgotPassword = () => {
    alert("Forgot Password?"); 
  };

  const showSuccessPopup = () => {
    const popup = document.getElementById("successPopup");
    popup.style.display = "block";

    setTimeout(() => {
      popup.style.display = "none";
    }, 3000);
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1 className="main-heading">Enter Your Details</h1>
        <form onSubmit={handleSubmit} className="login-form">
          <div>
            <label htmlFor="email" className="input-label">Email ID:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
              className="input-field"
            />
          </div>
          <div>
            <label htmlFor="password" className="input-label">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={handlePasswordChange}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="submit-button" onClick={goToFileUploadPage}>Login</button>
          <button type="button" className="forgot-password-button" onClick={handleForgotPassword}>Forgot Password?</button>
        </form>
      </div>

      
      <div className="popup" id="successPopup">
        <span className="popup-message">Successfully Logged In!</span>
      </div>
    </div>
  );
}

export default LoginPage;
