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
                <IconButton
                    aria-label="expand row"
                    size="small"
                    onClick={() => onSelectStudent(student)}
                >
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
    const [refreshKey, setRefreshKey] = useState(0);

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
    }, [refreshKey]);
    useEffect(() => {
        if (location.state?.refresh) {
            setRefreshKey((prevKey) => prevKey + 1); // Increment refreshKey to trigger re-fetch
            // Reset state to avoid loop
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

    const filteredStudents = students.filter((student) =>
        student.studentName
            .toLowerCase()
            .includes(debouncedSearchTerm.toLowerCase())
    );

    const handleSelectStudent = (selectedStudent) => {
        navigate("/GradingPage", {
            state: { selectedStudent, from: "/MainPageIndividual" },
        });
    };
    return (
        <>
            <Header />
            <div className="main-page-individual">
                <div
                    className="individual-search-bar"
                    style={{ width: "40%" }}
                ></div>
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
                            endAdornment: searchTerm && (
                                <IconButton onClick={() => setSearchTerm("")}>
                                    <ClearIcon />
                                </IconButton>
                            ),
                        }}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() =>
                            console.log(
                                "Export functionality to be implemented"
                            )
                        }
                        style={{ marginLeft: "8px" }}
                    >
                        Export
                    </Button>
                </div>
                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: 440,
                        maxWidth: 1400,
                        marginLeft: "-40px",
                        marginTop: "16px",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        border: "1px solid #000",
                        borderRadius: "4px",
                    }}
                >
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    style={{
                                        width: "80.3333%",
                                        fontFamily: "Arial",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    Name
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "80.3333%",
                                        fontFamily: "Arial",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    ASURite ID
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "80.3333%",
                                        fontFamily: "Arial",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                >
                                    Graded
                                </TableCell>
                                <TableCell
                                    style={{
                                        width: "80.3333%",
                                        fontFamily: "Arial",
                                        fontWeight: "bold",
                                        fontSize: "20px",
                                    }}
                                ></TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredStudents.map((student) => (
                                <StudentRow
                                    key={student.studentName}
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
