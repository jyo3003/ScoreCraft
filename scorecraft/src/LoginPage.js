// LoginPage.js
import React, { useState } from 'react';
import './LoginPage.css'; // Import CSS file for styling

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Perform login logic here
    console.log('Email:', email);
    console.log('Password:', password);
    // Clear form fields after submission
    setEmail('');
    setPassword('');
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
          <button type="submit" className="submit-button">Login</button>
        </form>
      </div>
    </div>
  );
}

export default LoginPage;