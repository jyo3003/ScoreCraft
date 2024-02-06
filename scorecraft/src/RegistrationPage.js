// RegistrationPage.js
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import './RegistrationPage.css'; // Import CSS file for styling

function RegistrationPage() {
  const history = useHistory();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [registrationSuccess, setRegistrationSuccess] = useState(false);

  const handleEmailChange = (event) => {
    const enteredEmail = event.target.value;
    setEmail(enteredEmail);

    // Email validation logic
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const isValidEmail = emailRegex.test(enteredEmail);

    if (!isValidEmail) {
      setEmailError('Please enter a valid email address');
    } else {
      setEmailError('');
    }
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Password and confirm password validation logic
    if (password !== confirmPassword) {
      setPasswordError("Passwords do not match. Please check and try again.");
      return;
    } else {
      setPasswordError('');
    }

    // Perform registration logic here

    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);

    // Simulate a successful registration
    setRegistrationSuccess(true);

    // Clear form fields after submission
    setEmail('');
    setPassword('');
    setConfirmPassword('');
  };

  const closeSuccessPopup = () => {
    setRegistrationSuccess(false);
  };

  const goToLoginPage = () => {
    history.push('/login');
  };

  return (
    <div className="registration-container">
      <div className="registration-box">
        <h1 className="main-heading">Register Your Account</h1>
        <form onSubmit={handleSubmit} className="registration-form">
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
            {emailError && <p className="error-message">{emailError}</p>}
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
          <div>
            <label htmlFor="confirmPassword" className="input-label">Confirm Password:</label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
              className="input-field"
            />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <button type="submit" className="register-button">Register</button>
        </form>
      </div>
      {registrationSuccess && (
        <div className="success-popup">
          <p className='success-message'>Registration successful! Welcome to SER517_Team16.</p>
          <button onClick={goToLoginPage}>Login</button>
          <button onClick={closeSuccessPopup}>Close</button>
        </div>
      )}
    </div>
  );
}

export default RegistrationPage;
