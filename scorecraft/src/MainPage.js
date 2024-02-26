import React, { useState, useEffect } from 'react';
import './MainPage.css';
import pencilImage from './Pencil.png';

const MainPage = () => {
  const [groupFilter, setGroupFilter] = useState('');
  const [individualScoreInput, setIndividualScoreInput] = useState('');
  const [groupScoreInput, setGroupScoreInput] = useState('');
  const [totalScore, setTotalScore] = useState('');

  // Initialize data array as empty
  const data = [];

  useEffect(() => {
    // Calculate and set the total score whenever individualScoreInput or groupScoreInput changes
    const individualScore = Number(individualScoreInput) || 0;
    const groupScore = Number(groupScoreInput) || 0;
    const total = individualScore + groupScore;
    setTotalScore(total.toString());
  }, [individualScoreInput, groupScoreInput]);

  // This function filters the data based on the group number.
  const filteredData = groupFilter
    ? data.filter(item => item.groupNumber.toString() === groupFilter)
    : data;

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
              <th>Name
                <input
                  type="text"
                  placeholder="Filter by Group Number"
                  value={groupFilter}
                  onChange={(e) => setGroupFilter(e.target.value)}
                  className="group-filter-input"
                />
              </th>
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
            {/* Static row for score inputs directly below the headers */}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td></td>
              <td>
                <input
                  type="number"
                  placeholder="Enter Score"
                  className="score-input"
                  value={individualScoreInput}
                  onChange={(e) => setIndividualScoreInput(e.target.value)}
                />
              </td>
              <td>
                <input
                  type="number"
                  placeholder="Enter Score"
                  className="score-input"
                  value={groupScoreInput}
                  onChange={(e) => setGroupScoreInput(e.target.value)}
                />
              </td>
              <td></td>
              <td>
                <input
                  type="text"
                  className="score-input total-score"
                  value={totalScore}
                  readOnly
                />
              </td>
            </tr>
            {/* Data rows would be mapped here if data were available */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;
