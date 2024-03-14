import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useNavigate } from 'react-router-dom';
import '../css/MainPageIndividual.css';
import grade from '../images/Grade.png';
import home from '../images/home.png';
import { getStudents } from '../api';

export default function MainPageIndividual() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const fetchedStudents = await getStudents();
        setStudents(fetchedStudents);
      } catch (error) {
        console.error("Failed to fetch students:", error.message);
      }
    };

    fetchStudents();
  }, []);

  const filteredStudents = students.filter(student =>
    student.studentName.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const handleCheckboxChange = (event, index) => {
    const updatedStudents = students.map((student, i) =>
        i === index ? { ...student, graded: event.target.checked } : student
    );
    setStudents(updatedStudents);
  };

  return (
    <>
      <header className="header">
        <img src={grade} alt="ScoreCraft Logo" className="pencil-logo" />
        <h1>ScoreCraft</h1>
        <button onClick={() => navigate('/')} className="home-button">
          <img src={home} alt="Home Icon" />
        </button>
      </header>
      <div className="main-page-individual">
        <div className="individual-search-bar">
          <input
            type="text"
            placeholder="Search Students"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="export-button">Export</button>
        </div>
        <div className="individual-students-table">
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
                  <td><span onClick={() => navigate('/GradingIndividual')} style={{ cursor: 'pointer', color: 'white', textDecoration: 'underline' }}>
          {student.studentName}
        </span></td>
                  <td>{student.asurite}</td>
                  <td>
                    <input
                        type="checkbox"
                        checked={student.graded}
                        onChange={(e) => handleCheckboxChange(e, index)}
                    />
                  </td>
                </tr>
            ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
