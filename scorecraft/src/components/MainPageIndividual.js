import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPageIndividual.css';
import { getStudents } from '../api';
import Header from './Header';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox } from '@mui/material';

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
      <Header />
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
        <TableContainer component={Paper} sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>ASURite ID</TableCell>
                <TableCell>Graded</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredStudents.map((student, index) => (
                <TableRow hover key={student.asurite}>
                  <TableCell>
                    <span onClick={() => navigate('/GradingPage')} style={{ cursor: 'pointer', color: 'black', textDecoration: 'underline' }}>
                      {student.studentName}
                    </span>
                  </TableCell>
                  <TableCell>{student.asurite}</TableCell>
                  <TableCell>
                    <Checkbox
                      checked={student.graded || false}
                      onChange={(e) => handleCheckboxChange(e, index)}
                      inputProps={{ 'aria-label': 'controlled' }}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
}
