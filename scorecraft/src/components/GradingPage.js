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
    const [selectedStudent, setSelectedStudent] = useState(selectedGroup ? selectedGroup.students[0] : '');
    const [gradingGroups, setGradingGroups] = useState([]);
    const [grades, setGrades] = useState({});

    // Initialize grades state when gradingGroups data is fetched
    useEffect(() => {
        if (gradingGroups.gradingCriteria) {
            const initialGrades = {};
            gradingGroups.gradingCriteria.forEach(criteria => {
                initialGrades[criteria.id] = {
                    score: '', // Initialize score as an empty string or other default value
                    comments: '' // Initialize comments as an empty string
                };
            });
            setGrades(initialGrades);
        }
    }, [gradingGroups]);

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            try {
                const data = await gradingAPI.getAllGradingGroups(selectedStudent.id);
                setGradingGroups(data);
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
            }
        };

        if (selectedStudent && selectedStudent.id) {
            fetchAllGradingGroups();
        }
    }, [selectedStudent]);

    const handleStudentChange = (event) => {
        setSelectedStudent(event.target.value);
    };

    const handleSubmitGrades = async () => {
        // Make sure each grade has a non-null criteriaId
        const payload = gradingGroups.gradingCriteria.map(criteria => ({
          studentId: gradingGroups.studentId, // Converting to string in case the server expects a string type
          score: grades[criteria.id]?.score || '',
          comment: grades[criteria.id]?.comments || '',
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
      
      
    return (
        <>
            <Header />
            <Box style={{ paddingTop: '100px', paddingLeft: '20px' }} sx={{ minWidth: 200 }}>
                <h2 style={{ color: '#fff', marginBottom: '20px' }}>{selectedGroup ? selectedGroup.groupName : 'Select a Group'}</h2>
                <FormControl variant="filled" style={{ minWidth: '200px', backgroundColor: '#fff', borderRadius: '4px' }}>
                    <InputLabel id="student-select-label">Student</InputLabel>
                    <Select
                        labelId="student-select-label"
                        id="student-select"
                        value={selectedStudent}
                        onChange={handleStudentChange}
                        sx={{ backgroundColor: '#fff', borderRadius: '4px' }}
                    >
                        {selectedGroup?.students.map((student) => (
                            <MenuItem key={student.id} value={student}>{student.studentName}</MenuItem>
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
                                        value={grades[criteria.id]?.score || ''}
                                        onChange={(e) => setGrades(prevGrades => ({
                                            ...prevGrades,
                                            [criteria.id]: {
                                                ...prevGrades[criteria.id],
                                                score: e.target.value
                                            }
                                        }))}
                                    />
                                </td>
                                <td>
                                    <input
                                        type="text"
                                        className="comments"
                                        placeholder="Enter comments"
                                        value={grades[criteria.id]?.comments || ''}
                                        onChange={(e) => setGrades(prevGrades => ({
                                            ...prevGrades,
                                            [criteria.id]: {
                                                ...prevGrades[criteria.id],
                                                comments: e.target.value
                                            }
                                        }))}
                                        />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        padding: '20px'
                    }}>
                        <Button variant="contained" color="success" onClick={handleSubmitGrades} style={{ color: "#fff" }}>
                            Submit
                        </Button>
                    </div>
                </div>
            </>
        );
    }
    
    export default GradingPage;
    
