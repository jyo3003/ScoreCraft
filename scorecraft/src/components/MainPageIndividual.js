import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../css/MainPageIndividual.css";
import { getStudents } from "../api";
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

    // Function to export student data to Excel
    const exportToExcel = () => {
        const ws = XLSX.utils.json_to_sheet(filteredStudents);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Students");
        XLSX.writeFile(wb, "StudentData.xlsx");
    };

    return (
        <>
            <Header />
            <div className="main-page-individual">
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
                        sx={{ width: "100%" }} // Adjust the width of the search bar
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={exportToExcel}
                        style={{ marginLeft: "8px" }}
                    >
                        Export
                    </Button>
                </div>
                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: 440,
                        marginTop: "16px",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        border: "1px solid #000",
                        borderRadius: "4px",
                        marginLeft: "-40px", // Move the table to the left
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>ASURite ID</TableCell>
                                <TableCell>Graded</TableCell>
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
