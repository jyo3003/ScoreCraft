import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/MainPageIndividual.css";
import { getStudents, downloadExcelFile , downloadExcelTwoFile} from "../api";
import Header from "./Header";
import {
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Checkbox,
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import * as XLSX from "xlsx";

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value);
    useEffect(() => {
        const handler = setTimeout(() => setDebouncedValue(value), delay);
        return () => clearTimeout(handler);
    }, [value, delay]);
    return debouncedValue;
}

function StudentRow({ student, onSelectStudent }) {
    return (
        <TableRow hover key={student.asurite}>
            <TableCell>{student.studentName}</TableCell>
            <TableCell>{student.asurite}</TableCell>
            <TableCell>
                <Checkbox checked={student.gradingStatus || false} disabled />
            </TableCell>
            <TableCell>
                <IconButton aria-label="select student" size="small" onClick={() => onSelectStudent(student)}>
                    <KeyboardArrowRightIcon />
                </IconButton>
            </TableCell>
        </TableRow>
    );
}

export default function MainPageIndividual() {
    const [searchTerm, setSearchTerm] = useState("");
    const debouncedSearchTerm = useDebounce(searchTerm, 500);
    const [students, setStudents] = useState([]);
    const navigate = useNavigate();
    const location = useLocation();

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

    const filteredStudents = students.filter((student) =>
        student.studentName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
    );

    const handleSelectStudent = (selectedStudent) => {
        navigate("/GradingPage", { state: { selectedStudent, from: "/MainPageIndividual" } });
    };

    // Add this function inside your MainPageGroup component
    const handleDownloadExcel = async () => {
        try {
            const excelBlob = await downloadExcelFile();
            const downloadUrl = window.URL.createObjectURL(excelBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'FinalGrades.xlsx'); // Specify the download file name
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the Excel file:', error.message);
        }
    };

    const handleDownloadExcelTwo = async () => {
        try {
            const excelBlob = await downloadExcelTwoFile();
            const downloadUrl = window.URL.createObjectURL(excelBlob);
            const link = document.createElement('a');
            link.href = downloadUrl;
            link.setAttribute('download', 'DetailedGrades.xlsx'); // Specify the download file name
            document.body.appendChild(link);
            link.click();
            link.parentNode.removeChild(link);
        } catch (error) {
            console.error('Error downloading the Excel file:', error.message);
        }
    };

    return (
        <>
            <Header />
            <div className="main-page-individual">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%' }}>
                        <div className="individual-search-bar" style={{ width: "40%" }}>
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
                                        <IconButton onClick={() => setSearchTerm("")}>
                                            <ClearIcon />
                                        </IconButton>
                                    ),
                                }}
                            />
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDownloadExcel}
                                style={{
                                    marginLeft: "8px",
                                    marginRight: "4px", 
                                    minWidth: "150px",
                                }}
                            >
                                Final Grades
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={handleDownloadExcelTwo}
                                style={{
                                    minWidth: "120px",
                                }}
                            >
                                Detailed Report
                            </Button>
                        </div>
                    </div>

                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: 440,
                        marginTop: "16px",
                        backgroundColor: "white",
                        boxShadow: "0px 4px 8px rgba(255, 0, 0, 0.5)",
                        border: "1px solid red",
                        borderRadius: "4px",
                        marginLeft: "-40px", // Move the table to the left
                    }}
                >
                    <Table stickyHeader aria-label="sticky table" >
                        <TableHead>
                            <TableRow>
                                <TableCell style={{ fontWeight: 'bold' }}>Name</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>ASURite ID</TableCell>
                                <TableCell style={{ fontWeight: 'bold' }}>Graded</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <StudentRow
                                    key={student.asurite}
                                    student={student}
                                    onSelectStudent={handleSelectStudent}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </>
    );
}
