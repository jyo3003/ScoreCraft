import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { getStudentsByGroup } from "../api";
import Header from "./Header";
import {
  Box,
  Collapse,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Paper,
  TextField,
  InputAdornment,
  Button,
} from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import SearchIcon from "@mui/icons-material/Search";
import ClearIcon from "@mui/icons-material/Clear";
import * as XLSX from "xlsx";

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

function GroupRow({ group, onSelectGroup }) {
  const [open, setOpen] = useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ "& > *": { borderBottom: "unset" } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {group.groupName}
        </TableCell>
        <TableCell>
          <input
            type="checkbox"
            checked={group.graded}
            onChange={(event) => event.stopPropagation()}
            onClick={(event) => event.stopPropagation()}
            readOnly
          />
        </TableCell>
        <TableCell>
          <IconButton aria-label="select group" size="small" onClick={() => onSelectGroup(group)}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                Students
              </Typography>
              {group.students.map((student) => (
                <Typography key={student.id} variant="body2">
                  {student.studentName}
                </Typography>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MainPageGroup = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const fetchStudentsByGroup = async () => {
      try {
        const studentsByGroup = await getStudentsByGroup();
        setGroups(studentsByGroup);
      } catch (error) {
        console.error("Failed to fetch students by group:", error.message);
      }
    };

    fetchStudentsByGroup();
  }, []);

  const handleSelectGroup = (selectedGroup) => {
    navigate("/GradingPage", { state: { selectedGroup } });
  };

  // Function to export group data to Excel
  const exportToExcel = () => {
    const exportableData = groups.map(group => ({
      "Group Name": group.groupName,
      "Student Names": group.students.map(s => s.studentName).join(", "),
    }));
    const ws = XLSX.utils.json_to_sheet(exportableData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Groups");
    XLSX.writeFile(wb, "GroupData.xlsx");
  };

  return (
    <div>
      <Header />
      <Box sx={{ mt: 3, mx: 4 }}>
        <TextField
          fullWidth
          type="text"
          placeholder="Search Groups"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
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
        <Button
          variant="contained"
          onClick={exportToExcel}
          sx={{ ml: 2 }}
        >
          Export
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ mt: 2, mx: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell />
              <TableCell>Group Name</TableCell>
              <TableCell>Graded</TableCell>
              <TableCell>Details</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {groups.filter(group => group.groupName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())).map((group, index) => (
              <GroupRow key={index} group={group} onSelectGroup={handleSelectGroup} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default MainPageGroup;