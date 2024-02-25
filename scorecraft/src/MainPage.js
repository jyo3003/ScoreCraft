import React from 'react';
import './MainPage.css'; // Import your CSS file for styling
import image from './Pencil.png'; // Import your image file

function MainPage() {
  return (
    <div className="main-container">
      <img src={image} alt="Scorecraft Logo" className="logo-image" />
      <h1 className="title">Scorecraft</h1>
      {/* Other components and content can be added here */}
    </div>
  );
}

export default MainPage;

