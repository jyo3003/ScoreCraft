import React, { useState } from 'react';
import './MainPage.css';
import pencilImage from './Pencil.png'; 

const MainPage = () => {
  const [groupFilter, setGroupFilter] = useState('');

  // This is where your data would come from, likely from state or props.
  // For demonstration purposes, I'll use an array of objects.
  const data = [
    // ... your data objects with name and groupNumber properties
  ];

  // This function filters the data based on the group number.
  const filteredData = groupFilter
    ? data.filter(item => item.groupNumber === groupFilter)
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
              <th>
                Name
                {/* Input for filtering by group number */}
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
            {filteredData.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td>{item.asuriteId}</td>
                <td>{item.groupNumber}</td>
                <td>{item.assignedTasks}</td>
                <td>{item.individualPoints}</td>
                <td>{item.groupPoints}</td>
                <td>{item.comments}</td>
                <td>{item.totalPoints}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default MainPage;
