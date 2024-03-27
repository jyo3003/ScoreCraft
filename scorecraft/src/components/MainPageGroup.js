import React, { useState, useEffect } from 'react';
import { useNavigate , useLocation} from 'react-router-dom';
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
                        onChange={(event) => event.stopPropagation()} 
                        onClick={(event) => event.stopPropagation()}
                        readOnly// Prevent row collapse when toggling checkbox
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
    const [refreshKey, setRefreshKey] = useState(0); // Ensure refreshKey is also declared if it's being used
    const navigate = useNavigate();
    const location = useLocation(); // Declare useLocation here and ensure it's not declared again

    useEffect(() => {
        const fetchStudentsByGroup = async () => {
            try {
                const studentsByGroup = await getStudentsByGroup();
                setGroups(studentsByGroup.map(group => ({ ...group, graded: group.isGraded })));
            } catch (error) {
                console.error("Failed to fetch students by group:", error.message);
            }
        };
        fetchStudentsByGroup();
    }, [refreshKey]);

    useEffect(() => {
        if (location.state?.refresh) {
            setRefreshKey(prevKey => prevKey + 1); 
            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location, navigate]);

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
                        sx={{ width: '40%', marginLeft: '80px' }} 
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
                <TableContainer component={Paper} sx={{ mt: 2, maxWidth:1240, marginLeft:12,border: '1px solid #000',borderRadius: '4px',
                    background: 'transparent' }}>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell />
                                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Group Name</TableCell>
                                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Graded</TableCell>
                                <TableCell style={{ fontFamily: 'Arial', fontWeight: 'bold', fontSize: '20px' }}>Go to Grading</TableCell>
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
