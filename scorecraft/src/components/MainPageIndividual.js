import React, { useState, useEffect } from 'react'; // Import useEffect here
import { useNavigate } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import '../css/MainPageIndividual.css';
import grade from '../images/Grade.png';
import home from '../images/home.png';
import { getStudents } from '../api'; // Make sure the path to your api.js is correct

export default function MainPageIndividual() {
  const [searchTerm, setSearchTerm] = useState('');
  const [students, setStudents] = useState([]); // State to store fetched students
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
  }, []); // Dependency array is empty, so this runs once on mount

  // Function to filter the displayed students based on the search term
  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to export filtered students to Excel
  const exportToCSV = (csvData, fileName) => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.json_to_sheet(csvData);
    const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], {type: fileType});
    FileSaver.saveAs(data, fileName + fileExtension);
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
          <button onClick={() => exportToCSV(filteredStudents, 'students_export')} className="export-button">Export</button>
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
                  <td>{student.name}</td>
                  <td>{student.asuriteId}</td>
                  <td>{student.graded ? '✔️' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
