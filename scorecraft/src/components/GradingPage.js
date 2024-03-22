import React, { useState, useEffect } from 'react';
import '../css/GradingPage.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Header from './Header';
import { gradingAPI } from '../api';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLocation } from 'react-router-dom';

function GradingPage() {
    const location = useLocation();
    const selectedGroup = location.state ? location.state.selectedGroup : null;
    const [selectedStudent, setSelectedStudent] = useState(selectedGroup.students[0]);
    const [rowData, setRowData] = useState();

    const [gradingGroups, setGradingGroups] = useState([]);
    const [grades, setGrades] = useState({});

    const handleStudentChange = (event) => {
        console.log(event.target.value);
        setSelectedStudent(event.target.value);
        console.log(selectedGroup);
      };

    // Initialize grades state when gradingGroups data is fetched
    useEffect(() => {
        if (gradingGroups.gradingCriteria) {
            const initialGrades = {};
            gradingGroups.gradingCriteria.forEach(criteria => {
                initialGrades[criteria.id] = {
                    gradedScore: criteria.gradedScore,
                    comment: criteria.comment || '' // Initialize comments if not set
                };
            });
            setGrades(initialGrades);
        }
    }, [gradingGroups]);

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            try {
                const data = await gradingAPI.getAllGradingGroups(selectedStudent.id);
                console.log('Received data:', data); // Log the data for debugging
                setGradingGroups(data); // Set the data as received
                setRowData(data.gradingCriteria);
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
            }
        };
        fetchAllGradingGroups();
    }, [selectedGroup, selectedStudent]);
    // Row Data: The data to be displayed.

    const handleSubmitGrades = async () => {
        // Make sure each grade has a non-null criteriaId
        const payload = gradingGroups.gradingCriteria.map(criteria => ({
          studentId: gradingGroups.studentId, // Converting to string in case the server expects a string type
          score: grades[criteria.id]?.gradedScore,
          comment: grades[criteria.id]?.comment || '',
          criteriaId: criteria.id
        }));
      
        console.log('Submitting grades:', payload);
      
        try {
          const response = await gradingAPI.submitGrades(payload);
          console.log('Submission response:', response);
          alert('Grades submitted successfully!');
        } catch (error) {
          console.error('Failed to submit grades:', error);
          alert('Failed to submit grades.');
        }
      };

    const [colDefs, setColDefs] = useState([
        { field: "id", rowDrag: true, flex: 1},
        { field: "criteriaName", flex: 3 },
        { field: "criteriaScore", flex:1 },
        { field: "typeOfCriteria", flex:1},
        { field: "gradingCriteriaGroupName",flex:2 },
        { field: "gradedScore", editable: true, flex:1},
        { field: "comment", editable: true, flex:2},   
    ]);
    return (
        <>
            <Header />
            <Box style={{ paddingTop: '100px', paddingLeft: '20px' }} sx={{ minWidth: 200 }}>
              <h2 style={{color:'#fff', marginBottom:'20px'}}>{selectedGroup.groupName}</h2>
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
                    <MenuItem key={student.id} value={student}>{student.studentName}</MenuItem>
                ))}
                </Select>
              </FormControl>
            </Box>
            {/* <div style={{ height: 'calc(100vh - 100px)', width: '100%', padding:'100px 20px 20px 20px' }} className="ag-theme-quartz">
                <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true} rowDragManaged={true} rowDragEntireRow={true}/>
            </div> */}

            <div style={{ paddingTop: '20px', paddingLeft: '20px', paddingRight: '20px' }}>

                <table className="table-sticky-header">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Criteria Name</th>
                            <th>Score</th>
                            <th>Type of Criteria</th>
                            <th>Grading Criteria Group Name</th>
                            <th>Input Score</th>
                            <th>Comments</th>
                        </tr>
                    </thead>
                    <tbody>
                        {gradingGroups.gradingCriteria?.map((criteria, index) => (
                            <tr key={index}>
                                <td>{criteria.id}</td>
                                <td>{criteria.criteriaName}</td>
                                <td>{criteria.criteriaScore}</td>
                                <td>{criteria.typeOfCriteria}</td>
                                <td>{criteria.gradingCriteriaGroupName}</td>
                                <td>
                                    <input
                                        type="number"
                                        className="input-score"
                                        placeholder="Enter score"
                                        value={grades[criteria.id]?.gradedScore}
                                        onChange={(e) => setGrades(prevGrades => ({
                                            ...prevGrades,
                                            [criteria.id]: {
                                                ...prevGrades[criteria.id],
                                                gradedScore: e.target.value
                                            }
                                        }))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="comments"
                                        placeholder="Enter comments"
                                        value={grades[criteria.id]?.comment || ''}
                                        onChange={(e) => setGrades(prevGrades => ({
                                            ...prevGrades,
                                            [criteria.id]: {
                                                ...prevGrades[criteria.id],
                                                comment: e.target.value
                                            }
                                        }))}
                                        />
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
            <div className="container" style={{
                    display: 'flex',
                    padding: '20px',
                    justifyContent: 'center'}}>
                <Button variant="contained" color="success" style={{color:"#fff"}} onClick={handleSubmitGrades}>
                Save
                </Button>
                </div>
        </>
    )};

export default GradingPage;
