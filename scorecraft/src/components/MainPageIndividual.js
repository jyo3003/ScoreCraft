import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import '../css/MainPageIndividual.css';
import grade from '../images/Grade.png';

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
        <button onClick={() => exportToCSV(filteredStudents, 'students_export')} className="export-button">Export</button>
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