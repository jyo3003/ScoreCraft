import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/MainPageIndividual.css';
import { getStudents } from '../api';
import Header from './Header';
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Checkbox, TextField, Button, InputAdornment, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

// Custom hook for debouncing
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default function MainPageIndividual() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500); // Debouncing search term
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

  // Filtering students based on debounced search term
  const filteredStudents = students.filter(student =>
      student.studentName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
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
              <div className="individual-search-bar" style={{ width: '40%',float: 'left', marginRight: '-210px' }}>
              </div>
              <div className="individual-search-bar" style={{ float: 'left' }}>
                  <TextField
                fullWidth
                type="text"
                placeholder="Search Students"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                variant="outlined"
            InputProps={{
                  startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon />
                      </InputAdornment>
                  ),
                  endAdornment: (
                      searchTerm && (
                          <IconButton onClick={() => setSearchTerm('')}>
                            <ClearIcon />
                          </IconButton>
                      )
                  ),
                }}
            />
            <Button variant="contained" color="primary" onClick={() => console.log('Export functionality to be implemented')} style={{ marginLeft: '8px' }}>
              Export
            </Button>
          </div>
          <TableContainer component={Paper} sx={{ maxHeight: 440, maxWidth:1400, marginLeft: '-40px', marginTop: '16px', backgroundColor: 'transparent', boxShadow: 'none'}}>
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell  style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Name</TableCell>
                  <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>ASURite ID</TableCell>
                  <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Graded</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredStudents.map((student, index) => (
                    <TableRow hover key={student.asurite}>
                      <TableCell>
                    <span onClick={() => navigate('/GradingPage', { state: { student } })} style={{ cursor: 'pointer', textDecoration: 'underline' }}>
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
