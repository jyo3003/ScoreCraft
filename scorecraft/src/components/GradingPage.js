import React, { useState, useEffect } from 'react';
import '../css/GradingPage.css';
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Header from './Header';
import { gradingAPI } from '../api';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Box from '@mui/material/Box';
import { useLocation } from 'react-router-dom';

function GradingPage() {
  
    const location = useLocation();
    const selectedGroup = location.state ? location.state.selectedGroup : null;
    const [selectedStudent, setSelectedStudent] = useState('');

    const [gradingGroups, setGradingGroups] = useState([]);

    const handleStudentChange = (event) => {
      setSelectedStudent(event.target.value);
      console.log(selectedGroup);
    };

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            try {
                const data = await gradingAPI.getAllGradingGroups();
                console.log('Received data:', data); // Log the data for debugging
                setGradingGroups(data); // Set the data as received
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
                // Handle error state appropriately
            }
        };

        fetchAllGradingGroups();
    }, []);
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
        { make: 'Fiat', model: '500', price: 15774, electric: false },
        { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ]);

    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);
    return (
        <>
            <Header />
              {/* <div style={{ height: 'calc(100vh - 100px)', width: '100%', paddingTop:'100px' }} className="ag-theme-quartz">
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div> */}

            <Box style={{ paddingTop: '100px', paddingLeft: '20px' }} sx={{ minWidth: 200 }}>
              <FormControl variant="filled" style={{ minWidth: '200px', backgroundColor: '#fff', borderRadius: '4px' }}>
                <InputLabel id="demo-simple-select-filled-label">Student</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={selectedStudent}
                  label="Student Name"
                  onChange={handleStudentChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '4px' }} // Light-themed background color
                >
                {selectedGroup && selectedGroup.students.map((student) => (
                    <MenuItem key={student.id} value={student.studentName}>{student.studentName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Box>
            <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>
                <table className="table-sticky-header">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Criteria Name</th>
                            <th>Score</th>
                            <th>Type of Criteria</th>
                            <th>Grading Criteria Group Name</th>
                            <th>Input Score</th> {/* New column for score input */}
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradingGroups.map(group => 
                            group.gradingCriteria.map((criteria, index) => (
                                <tr key={index}>
                                    <td>{criteria.id}</td>
                                    <td>{criteria.criteriaName}</td>
                                    <td>{criteria.score}</td>
                                    <td>{criteria.typeOfCriteria}</td>
                                    <td>{group.gradingCriteriaGroupName}</td>
                                    <td>
                                        <input
                                            type="number"
                                            className="input-score"
                                            placeholder="Enter score"
                                            // Add onChange handler as needed
                                        />
                                    </td>
                                    <td><input
                                        type="text"
                                        className="comments"
                                    />{criteria.comments}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );}

export default GradingPage;
