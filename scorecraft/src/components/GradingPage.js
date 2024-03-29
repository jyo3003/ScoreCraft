import React, { useState, useEffect } from 'react';
import { AgGridReact } from 'ag-grid-react';
import '../css/GradingPage.css';
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Header from './Header';
import { gradingAPI, addGradingCriteria } from '../api';
import { useLocation, useNavigate } from 'react-router-dom';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, Modal, TextField, Typography } from '@mui/material';


function GradingPage() {
   const location = useLocation();
   const selectedGroup = location.state ? location.state.selectedGroup : null;
   const selectedStudent = location.state ? location.state.selectedStudent : null;
   const [studentSelect, setSelectStudent] = useState(selectedGroup ? selectedGroup.students[0] : null);
   const [rowData, setRowData] = useState();
   const navigate = useNavigate();
   const [groupColors, setGroupColors] = useState({});
   const [gradingGroups, setGradingGroups] = useState([]);
   const [criteriaChangeTrigger, setCriteriaChangeTrigger] = useState(0);


   // Additional state for modal and form
   const [openModal, setOpenModal] = useState(false);
   const [newCriteria, setNewCriteria] = useState({
       criteriaName: '',
       criteriaScore: '',
       typeOfCriteria: '',
       gradingCriteriaGroupName: '',
       gradedScore: '',
       comment: '',
   });

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            var data={};
            try {
                if(selectedGroup){
                    data = await gradingAPI.getAllGradingGroups(studentSelect.id);
                    setGradingGroups(data); 
                    const formattedData = data?.gradingCriteria?.map((criteria)=>{
                        if(String(criteria?.typeOfCriteria)?.trim() === "G"){
                            return {...criteria, checkbox: false};
                        }
                        else{
                            return {...criteria};
                        }
                    });
                    console.log(formattedData)
                    setRowData(formattedData);
                }
                else if(selectedStudent){
                    data = await gradingAPI.getAllGradingGroups(selectedStudent.id);
                    setGradingGroups(data);
                    const formattedData = data?.gradingCriteria?.map((criteria)=>{
                        if(String(criteria?.typeOfCriteria)?.trim() === "G"){
                            return {...criteria, checkbox: false};
                        }
                        else{
                            return {...criteria};
                        }
                    });
                    setRowData(formattedData); 
                }
                console.log('Received data:', data); 
                // setRowData(data.gradingCriteria);
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
            }
        };
        fetchAllGradingGroups();
    }, [selectedGroup, studentSelect, selectedStudent, criteriaChangeTrigger, openModal]);

   // Function to handle form input changes
   const handleCriteriaChange = (event) => {
       setNewCriteria({ ...newCriteria, [event.target.name]: event.target.value });
   };

   // Existing handleCriteriaChange and other component logic...

   const handleSubmitCriteria = async (event) => {
    event.preventDefault(); // Prevent default form submission which refreshes the page

    const formData = {
        criteriaName: newCriteria.criteriaName,
        criteriaScore: newCriteria.criteriaScore,
        typeOfCriteria: newCriteria.typeOfCriteria,
        gradingCriteriaGroupName: newCriteria.gradingCriteriaGroupName,
        gradedScore: newCriteria.gradedScore,
        comment: newCriteria.comment
    };
    
    try {
        await addGradingCriteria(formData);
        alert('Criteria added successfully!');
        setOpenModal(false);
    } catch (error) {
        console.error("Error adding criteria:", error);
        alert("Failed to add criteria: " + error.message);
    }
  };
    

    const handleSubmitGrades = async () => {
        const payload = rowData?.map(criteria => ({
          studentId: gradingGroups?.studentId, // Converting to string in case the server expects a string type
          score: criteria?.gradedScore,
          comment: criteria?.comment || '',
          criteriaId: criteria?.id,
          checkbox: criteria?.checkbox || null
        }));
    
        console.log('Submitting grades:', payload);
    
        try {
            const response = await gradingAPI.submitGrades(payload);
            console.log('Submission response:', response);
            alert('Grades submitted successfully!');
    
            
            //if (selectedGroup) {
                // Navigate to the group main page if grading a group, passing the refresh state.
               // navigate('/MainPageGroup', { state: { refresh: true } });
             if (selectedStudent) {
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
        'cell-invalid': params => params.value < 0 || params.value > params.data?.criteriaScore
    };
    useEffect(() => {
        // Assign random colors to each distinct gradingCriteriaGroupName
        const uniqueGroups = new Set(rowData?.map(row => row?.gradingCriteriaGroupName));
        uniqueGroups.forEach(group => {
            groupColors[group] = randomColor(); // Generate random color for each group
        });
        setGroupColors(groupColors);
    }, [rowData]);

    const randomColor = () => {
        const hue = Math.floor(Math.random() * 360); // Random hue value
        const pastel = `hsl(${hue}, 80%, 80%)`; // Adjust saturation and lightness for pastel color
        return pastel;
    };

   // Modal styling
   const modalStyle = {
       position: 'absolute',
       top: '50%',
       left: '50%',
       transform: 'translate(-50%, -50%)',
       width: 400,
       bgcolor: 'background.paper',
       border: '2px solid #000',
       boxShadow: 24,
       p: 4,
   };


   const handleStudentChange = (event) => {
       setSelectStudent(event.target.value);
     };


   // Custom cell renderer for scores
   const scoreCellRenderer = (params) => {
       // Check if the score is null and return an empty string; otherwise, return the score
       return params.value === -100.0 ? 0.0 : params.value;
   };

    const checkboxCellRenderer = (params) => {
        const criteriaRow = params.node.data;
        if (criteriaRow.hasOwnProperty('checkbox')) {
            return (
                <input 
                    type="checkbox" 
                    checked={criteriaRow?.checkbox} 
                    onChange={(e) => {
                        const criteriaId = criteriaRow.id;
                        setRowData(prevRowData => 
                            prevRowData.map(row => 
                                row.id === criteriaId ? {...row, checkbox: e.target.checked} : row
                            )
                        );
                    }} 
                />
            );
        } else {
            return null; // Return null if the field doesn't exist
        }
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
        {
            field: "gradedScore",
            editable: true,
            flex:1,
            cellClassRules: cellClassRules,
            cellRenderer: scoreCellRenderer, // Use custom renderer here
        },
        { 
            field: "comment", 
            editable: true, 
            flex: 3, 
            cellEditor: "agSelectCellEditor", 
            cellEditorParams: params => {
                const rowData = params.node.data;
                return { values: rowData.predefinedComments || [], valueListGap: 10};
            }
        },
        {
            field: "checkbox",
            flex: 1,
            cellRenderer: checkboxCellRenderer
        }        
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
           <Button variant="contained" style={{ maxHeight: '40px', marginRight: '20px', marginLeft:'auto' }} onClick={() => setOpenModal(true)}>
                   Add Criteria
               </Button>
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
           <Modal
 open={openModal}
 onClose={() => setOpenModal(false)}
 aria-labelledby="modal-modal-title"
 aria-describedby="modal-modal-description"
>
 <Box sx={modalStyle}>
   <Typography id="modal-modal-title" variant="h6" component="h2">
     Add New Criteria
   </Typography>
   <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
     <TextField
       margin="normal"
       required
       fullWidth
       id="criteriaName"
       label="Criteria Name"
       name="criteriaName"
       autoFocus
       value={newCriteria.criteriaName}
       onChange={handleCriteriaChange}
     />
     <TextField
       margin="normal"
       required
       fullWidth
       name="criteriaScore"
       label="Criteria Score"
       type="number"
       id="criteriaScore"
       value={newCriteria.criteriaScore}
       onChange={handleCriteriaChange}
     />
     <TextField
       margin="normal"
       required
       fullWidth
       name="typeOfCriteria"
       label="Type Of Criteria"
       id="typeOfCriteria"
       value={newCriteria.typeOfCriteria}
       onChange={handleCriteriaChange}
     />
     <TextField
       margin="normal"
       required
       fullWidth
       name="gradingCriteriaGroupName"
       label="Grading Criteria Group Name"
       id="gradingCriteriaGroupName"
       value={newCriteria.gradingCriteriaGroupName}
       onChange={handleCriteriaChange}
     />
     <TextField
       margin="normal"
       fullWidth
       name="gradedScore"
       label="Graded Score"
       type="number"
       id="gradedScore"
       value={newCriteria.gradedScore}
       onChange={handleCriteriaChange}
     />
     <TextField
       margin="normal"
       fullWidth
       name="comment"
       label="Comment"
       id="comment"
       multiline
       rows={4}
       value={newCriteria.comment}
       onChange={handleCriteriaChange}
     />
     <Button
       type="submit"
       fullWidth
       variant="contained"
       sx={{ mt: 3, mb: 2 }}
       onClick={handleSubmitCriteria}
     >
       Submit
     </Button>
   </Box>
 </Box>
</Modal>






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