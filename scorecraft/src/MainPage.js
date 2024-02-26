// MainPage.js
import React from 'react';
import './MainPage.css';
import pencilImage from './Pencil.png'; // Make sure the image is in your project directory

const MainPage = () => {
  return (
    <div className="scorecraft-container">
      <div className="header">
        <img src={pencilImage} alt="Pencil" className="pencil-logo" />
        <h1 className="title">ScoreCraft</h1>
      </div>
      <div className="table-container">
        <table className="score-table">
          <thead>
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name</th>
              <th>Asurite ID</th>
              <th>Group Number</th>
              <th>Assigned tasks</th>
              <th>Individual points</th>
              <th>Group points</th>
              <th>Comments</th>
              <th>Total Points</th>
            </tr>
          </thead>
          <tbody>
            {/* Table rows will be dynamically inserted here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;