import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '../css/GradingPage.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Header from './Header';
import { gradingAPI } from '../api';
import { Box, Button, FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { useLocation, useNavigate } from 'react-router-dom';


function GradingPage() {
    const location = useLocation();
    const selectedGroup = location.state ? location.state.selectedGroup : null;
    const selectedStudent = location.state ? location.state.selectedStudent : null;
    const [studentSelect, setSelectStudent] = useState(selectedGroup? selectedGroup.students[0]: null);
    const [rowData, setRowData] = useState();
    const navigate = useNavigate();
    const [groupColors, setGroupColors] = useState({});

    const [gradingGroups, setGradingGroups] = useState([]);

    const handleStudentChange = (event) => {
        console.log(event.target.value);
        setSelectStudent(event.target.value);
        console.log(selectedGroup);
      };

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            var data={};
            try {
                if(selectedGroup){
                    data = await gradingAPI.getAllGradingGroups(studentSelect.id);
                    setGradingGroups(data); 
                    setRowData(data.gradingCriteria);
                }
                else if(selectedStudent){
                    data = await gradingAPI.getAllGradingGroups(selectedStudent.id);
                    setGradingGroups(data); 
                    setRowData(data.gradingCriteria);
                }
                console.log('Received data:', data); 
                // setRowData(data.gradingCriteria);
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
            }
        };
        fetchAllGradingGroups();
    }, [selectedGroup, studentSelect, selectedStudent]);
    

    const handleSubmitGrades = async () => {
      
        console.log(rowData);
        const payload = rowData?.map(criteria => ({
          studentId: gradingGroups?.studentId, // Converting to string in case the server expects a string type
          score: criteria?.gradedScore,
          comment: criteria?.comment || '',
          criteriaId: criteria?.id
        }));
    
        console.log('Submitting grades:', payload);
    
        try {
            const response = await gradingAPI.submitGrades(payload);
            console.log('Submission response:', response);
            alert('Grades submitted successfully!');
    
            
            if (selectedGroup) {
                // Navigate to the group main page if grading a group, passing the refresh state.
                navigate('/MainPageGroup', { state: { refresh: true } });
            } else if (selectedStudent) {
                // Navigate to the individual main page if grading an individual, passing the refresh state.
                navigate('/MainPageIndividual', { state: { refresh: true } });
            }
        } catch (error) {
            console.error('Failed to submit grades:', error);
            alert('Failed to submit grades.');
        }
      };
            // CSS class to highlight invalid cell values
    const cellClassRules = {
        'cell-invalid': params => params.value < 0 || params.value > params.data.criteriaScore
    };
    useEffect(() => {
        // Assign random colors to each distinct gradingCriteriaGroupName
        const uniqueGroups = new Set(rowData?.map(row => row.gradingCriteriaGroupName));
        uniqueGroups.forEach(group => {
            groupColors[group] = randomColor(); // Generate random color for each group
        });
        console.log('Group colors:', groupColors);
        setGroupColors(groupColors);
    }, [rowData]);

    const randomColor = () => {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

      const [colDefs, setColDefs] = useState([
        { field: "id", rowDrag: true, flex: 1 },
        { field: "criteriaName", flex: 3 }, 
        { field: "criteriaScore", flex: 1 },
        { field: "typeOfCriteria", flex: 1 },
        { field: "gradingCriteriaGroupName", flex: 2, cellStyle: params => {
            const backgroundColor = groupColors[params.value];
            return { backgroundColor }; // Return an object with the backgroundColor property
        }},
        { field: "gradedScore", editable: true, flex: 1, cellClassRules: cellClassRules },
        { field: "comment", editable: true, flex: 2 },   
    ]);


return (
        <>
            <Header />
            <div style={{display:'flex', justifyContent:'space-between', alignItems:'end'}}>
            <Box style={{ paddingTop: '100px', paddingLeft: '20px' }} sx={{ minWidth: 200 }}>
              {selectedStudent ? <h2 style={{color:'#000', marginBottom:'20px'}}>{selectedStudent.studentName}</h2>:null}
              {selectedGroup ?<h2 style={{color:'#000', marginBottom:'20px'}}>{selectedGroup.groupName}</h2>:null}
              {selectedGroup?<FormControl variant="filled" style={{ minWidth: '200px', backgroundColor: '#fff', borderRadius: '4px' }}>
                <InputLabel id="demo-simple-select-filled-label">Student</InputLabel>
                <Select
                  labelId="demo-simple-select-filled-label"
                  id="demo-simple-select-filled"
                  value={studentSelect}
                  label="Student Name"
                  onChange={handleStudentChange}
                  sx={{ backgroundColor: '#fff', borderRadius: '4px' }} // Light-themed background color
                >
                {selectedGroup?.students?.map((student) => (
                    <MenuItem key={student.id} value={student}>{student.studentName}</MenuItem>
                ))}
                </Select>
              </FormControl>:null}
            </Box>
            <Button variant="contained" style={{color:'#fff', maxHeight:'40px', marginRight:'20px'}} onClick={()=>{
                if(selectedGroup){
                    navigate(`/MainPageGroup`);
                }
                else if(selectedStudent){
                    navigate(`/MainPageIndividual`);
                }
            }
            }>
                Back
            </Button>
            </div>

            <div style={{ height: 'calc(100vh - 100px)', width: '100%', padding:'20px' }} className="ag-theme-quartz">
                <AgGridReact rowData={rowData} columnDefs={colDefs} pagination={true} rowDragManaged={true} rowDragEntireRow={true}/>
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
