import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "../css/GradingPage.css";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import Header from "./Header";
import { gradingAPI } from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import NewCriteriaModal from "./NewCriteriaModal";

function GradingPage() {
    const location = useLocation();
    const selectedGroup = location.state ? location.state.selectedGroup : null;
    const selectedStudent = location.state ? location.state.selectedStudent : null;
    const [studentSelect, setSelectStudent] = useState(selectedGroup ? selectedGroup.students[0] : null);
    const [rowData, setRowData] = useState();
    const navigate = useNavigate();
    const [groupColors, setGroupColors] = useState({});
    const [gradingGroups, setGradingGroups] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [totalScore, setTotalScore] = useState(0);
    const [freeFormComment, setFreeFormComment] = useState("");
    useEffect(() => {
        if (rowData) {
            const sum = rowData.reduce((acc, criteria) => {
                const gradedScore =
                    Number(criteria.gradedScore) && criteria.gradedScore !== -100 ? Number(criteria.gradedScore) : 0;
                return acc + gradedScore;
            }, 0);
            setTotalScore(sum);
        }
    }, [rowData]);

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            var data = {};
            try {
                if (selectedGroup) {
                    data = await gradingAPI.getAllGradingGroups(studentSelect.id);
                    const formattedData = data?.gradingCriteria?.map((criteria) => {
                        if (String(criteria?.typeOfCriteria)?.trim() === "G") {
                            if (!criteria?.checkbox) {
                                return { ...criteria, checkbox: false };
                            } else {
                                return { ...criteria };
                            }
                        } else {
                            return { ...criteria };
                        }
                    });
                    console.log(formattedData);
                    setGradingGroups(data);
                    setRowData(formattedData);
                    setFreeFormComment(data?.freeFormComment ? data.freeFormComment : "");
                } else if (selectedStudent) {
                    data = await gradingAPI.getAllGradingGroups(selectedStudent.id);
                    setGradingGroups(data);
                    setRowData(data?.gradingCriteria);
                }
                console.log("Received data:", data);
                // setRowData(data.gradingCriteria);
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
            }
        };
        fetchAllGradingGroups();
    }, [selectedGroup, studentSelect, selectedStudent, openModal]);

    const handleSubmitGrades = async () => {
        const studentGrades = rowData?.map((criteria) => ({
            studentId: gradingGroups?.studentId, // Converting to string in case the server expects a string type
            score: criteria?.gradedScore,
            comment: criteria?.comment || "",
            criteriaId: criteria?.id,
            checkbox: criteria?.checkbox,
        }));

        console.log("Submitting grades:", { studentGrades, freeFormComment });

        try {
            const response = await gradingAPI.submitGrades({ studentGrades, freeFormComment });
            console.log("Submission response:", response);
            alert("Grades submitted successfully!");
            if (selectedStudent) {
                // Navigate to the individual main page if grading an individual, passing the refresh state.
                navigate("/MainPageIndividual", { state: { refresh: true } });
            }
        } catch (error) {
            console.error("Failed to submit grades:", error);
            alert("Failed to submit grades.");
        }
    };
    // CSS class to highlight invalid cell values
    const cellClassRules = {
        "cell-invalid": (params) => params.value < 0 || params.value > params.data?.criteriaScore,
    };
    useEffect(() => {
        // Assign random colors to each distinct gradingCriteriaGroupName
        const uniqueGroups = new Set(rowData?.map((row) => row?.gradingCriteriaGroupName));
        uniqueGroups.forEach((group) => {
            groupColors[group] = randomColor(); // Generate random color for each group
        });
        setGroupColors(groupColors);
    }, [rowData]);

    const randomColor = () => {
        const hue = Math.floor(Math.random() * 360); // Random hue value
        const pastel = `hsl(${hue}, 80%, 80%)`; // Adjust saturation and lightness for pastel color
        return pastel;
    };

    const handleStudentChange = (event) => {
        setSelectStudent(event.target.value);
    };

    const scoreCellRenderer = (params) => {
        return params.value === -100.0 ? 0.0 : params.value;
    };
    const extractScoreFromComment = (comment) => {
        const scoreRegex = /\((\d+(\.\d+)?)\)/;
        const match = scoreRegex.exec(comment);

        if (match) {
            return parseFloat(match[1]);
        }

        return null;
    };

    const onCellValueChanged = (params) => {
        const updatedRowData = [...rowData];
        const currentRowIndex = params.node.rowIndex;
        const currentRow = { ...updatedRowData[currentRowIndex] };

        if (params.colDef.field === "comment") {
            const extractedScore = extractScoreFromComment(currentRow.comment);
            if (extractedScore !== null) {
                currentRow.gradedScore = extractedScore;
            }
            updatedRowData[currentRowIndex] = currentRow;
            setRowData(updatedRowData);
            calculateTotalScore(updatedRowData);
        }
    };

    const calculateTotalScore = (currentRowData) => {
        const sum = currentRowData.reduce((acc, criteria) => {
            const score = Number(criteria.gradedScore) || 0;
            return acc + score;
        }, 0);
        setTotalScore(sum);
    };

    const checkboxCellRenderer = (params) => {
        const criteriaRow = params.node.data;
        if (criteriaRow.hasOwnProperty("checkbox") && criteriaRow.checkbox !== null) {
            return (
                <input
                    type="checkbox"
                    checked={criteriaRow?.checkbox}
                    onChange={(e) => {
                        const criteriaId = criteriaRow.id;
                        setRowData((prevRowData) =>
                            prevRowData.map((row) =>
                                row.id === criteriaId ? { ...row, checkbox: e.target.checked } : row
                            )
                        );
                    }}
                />
            );
        } else {
            return null; // Return null if the field doesn't exist
        }
    };
    const [colDefs, setColDefs] = useState(() => {
        if (selectedStudent) {
            return [
                { field: "id", rowDrag: true, flex: 1 },
                { field: "criteriaName", flex: 3 },
                { field: "criteriaScore", flex: 1 },
                { field: "typeOfCriteria", flex: 1 },
                {
                    field: "gradingCriteriaGroupName",
                    flex: 2,
                    cellStyle: (params) => {
                        const backgroundColor = groupColors[params.value];
                        return { backgroundColor }; // Return an object with the backgroundColor property
                    },
                },
                {
                    field: "gradedScore",
                    editable: true,
                    flex: 1,
                    cellClassRules: cellClassRules,
                    cellRenderer: scoreCellRenderer, // Use custom renderer here
                },
                {
                    field: "comment",
                    editable: true,
                    flex: 3,
                    cellEditor: "agSelectCellEditor",
                    cellEditorParams: (params) => {
                        const rowData = params.node.data;
                        return {
                            values: rowData.predefinedComments || [],
                            valueListGap: 10,
                        };
                    },
                },
            ];
        } else {
            return [
                { field: "id", rowDrag: true, flex: 1 },
                { field: "criteriaName", flex: 3 },
                { field: "criteriaScore", flex: 1 },
                { field: "typeOfCriteria", flex: 1 },
                {
                    field: "gradingCriteriaGroupName",
                    flex: 2,
                    cellStyle: (params) => {
                        const backgroundColor = groupColors[params.value];
                        return { backgroundColor }; // Return an object with the backgroundColor property
                    },
                },
                {
                    field: "gradedScore",
                    editable: true,
                    flex: 1,
                    cellClassRules: cellClassRules,
                    cellRenderer: scoreCellRenderer, // Use custom renderer here
                },
                {
                    field: "comment",
                    editable: true,
                    flex: 3,
                    cellEditor: "agSelectCellEditor",
                    cellEditorParams: (params) => {
                        const rowData = params.node.data;
                        return {
                            values: rowData.predefinedComments || [],
                            valueListGap: 10,
                        };
                    },
                },
                {
                    field: "checkbox",
                    flex: 1,
                    cellRenderer: checkboxCellRenderer,
                },
            ];
        }
    });

    return (
        <>
            <Header />
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "end",
                }}
            >
                <Box style={{ paddingTop: "100px", paddingLeft: "20px" }} sx={{ minWidth: 200 }}>
                    {selectedStudent ? (
                        <h2 style={{ color: "#000", marginBottom: "20px" }}>{selectedStudent.studentName}</h2>
                    ) : null}
                    {selectedGroup ? (
                        <h2 style={{ color: "#000", marginBottom: "20px" }}>{selectedGroup.groupName}</h2>
                    ) : null}
                    {selectedGroup ? (
                        <FormControl
                            variant="filled"
                            style={{
                                minWidth: "200px",
                                backgroundColor: "#fff",
                                borderRadius: "4px",
                            }}
                        >
                            <InputLabel id="demo-simple-select-filled-label">Student</InputLabel>
                            <Select
                                labelId="demo-simple-select-filled-label"
                                id="demo-simple-select-filled"
                                value={studentSelect}
                                label="Student Name"
                                onChange={handleStudentChange}
                                sx={{
                                    backgroundColor: "#fff",
                                    borderRadius: "4px",
                                }} // Light-themed background color
                            >
                                {selectedGroup?.students?.map((student) => (
                                    <MenuItem key={student.id} value={student}>
                                        {student.studentName}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    ) : null}
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                    <FormControl></FormControl>
                    <Box
                        style={{
                            padding: "10px",
                            border: "1px solid #ccc",
                            borderRadius: "4px",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            minWidth: "50px",
                        }}
                    >
                        {totalScore}
                    </Box>
                </Box>

                <Button
                    variant="contained"
                    style={{
                        maxHeight: "40px",
                        marginRight: "20px",
                        marginLeft: "auto",
                    }}
                    onClick={() => setOpenModal(true)}
                >
                    Add Criteria
                </Button>
                <NewCriteriaModal openModal={openModal} setOpenModal={setOpenModal} />
                <Button
                    variant="contained"
                    style={{
                        color: "#fff",
                        maxHeight: "40px",
                        marginRight: "20px",
                    }}
                    onClick={() => {
                        if (selectedGroup) {
                            navigate(`/MainPageGroup`);
                        } else if (selectedStudent) {
                            navigate(`/MainPageIndividual`);
                        }
                    }}
                >
                    Back
                </Button>
            </div>

            <div
                style={{
                    height: "calc(100vh - 100px)",
                    width: "100%",
                    padding: "20px",
                }}
                className="ag-theme-quartz"
            >
                <AgGridReact
                    rowData={rowData}
                    columnDefs={colDefs}
                    pagination={true}
                    rowDragManaged={true}
                    rowDragEntireRow={true}
                    onCellValueChanged={onCellValueChanged}
                />
            </div>
            <div style={{ display: "flex", justifyContent: "center", alignContent: "center" }}>
                <TextField
                    id="outlined-multiline-flexible"
                    label="Comment"
                    multiline
                    rows={4}
                    style={{ width: "500px" }}
                    value={freeFormComment}
                    onChange={(e) => setFreeFormComment(e.target.value)}
                />
            </div>
            <div
                className="container"
                style={{
                    display: "flex",
                    padding: "20px",
                    justifyContent: "center",
                }}
            >
                <Button variant="contained" color="success" style={{ color: "#fff" }} onClick={handleSubmitGrades}>
                    Save
                </Button>
            </div>
        </>
    );
}

export default GradingPage;
