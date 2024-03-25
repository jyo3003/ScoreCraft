import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsByGroup } from '../api';
import Header from './Header';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper, TextField, InputAdornment } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import SearchIcon from '@mui/icons-material/Search';
import ClearIcon from '@mui/icons-material/Clear';

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
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row" style={{ fontFamily: 'Arial', fontStyle: 'bold' }}>
          {group.groupName}
        </TableCell>
        <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold' }}>
          <input
            type="checkbox"
            checked={group.graded}
            onChange={(event) => event.stopPropagation()} // Prevent row collapse when toggling checkbox
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
                <Box key={student.id} sx={{ marginRight: 2 }}>
                  <Typography variant="body1">{student.studentName}</Typography>
                </Box>
              ))}
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const MainPageGroup = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

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
    navigate('/GradingPage', { state: { selectedGroup } });
  };

  const filteredGroups = groups.filter(group =>
    group.groupName.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
  );

  return (
    <div>
      <Header />
      <div style={{ width: '100%', paddingTop: '100px' }}>
        <Box sx={{ mt: 2, mx: 2 }}>
          <TextField
            type="text"
            placeholder="Search Groups"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            fullWidth
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
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2, mx: 2,
            background: 'transparent' }}>
          <Table aria-label="collapsible table">
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Group Name</TableCell>
                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Graded</TableCell>
                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Details</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGroups.map((group, index) => (
                <GroupRow key={index} group={group} onSelectGroup={handleSelectGroup} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </div>
  );
};
export default MainPageGroup;
