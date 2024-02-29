import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPageIndividual.css';
import grade from './Grade.png';
import backgroundImage from './Background.jpg';

const MainPageIndividual = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate(); // Hook for navigation


  const students = [];

  // This would be used to filter the displayed students based on the search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to navigate to the home page (FileUploadPage)
  const goToHome = () => {
    navigate('/FileUploadPage');
  };

  return (
    <div className="main-page-individual">
    <div className="header-container">      
    <img src={grade} alt="Img" className="pencil-logo"/>
    <span className="header-title">ScoreCraft</span>
   </div>
    <button onClick={goToHome} className="home-button">Home</button>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search Students"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button className="export-button">Export</button>
      </div>
      <div className="students-table">
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ASURite ID</th>
              <th>Graded</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map((student, index) => (
              <tr key={index}>
                <td>{student.name}</td>
                <td>{student.asuriteId}</td>
                <td>{student.graded ? '✔️' : ''}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MainPageIndividual;
