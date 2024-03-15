import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getStudentsByGroup } from '../api';
import { Box, Collapse, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography, Paper } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import grade from '../images/Grade.png';
import home from '../images/home.png';

function GroupRow({ group }) {
  const [open, setOpen] = useState(false);

  return (
      <React.Fragment>
        <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
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
                onChange={(event) => event.stopPropagation()} // Prevent row collapse when toggling checkbox
                // Implement the toggleGraded logic here if necessary
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
            <Collapse in={open} timeout="auto" unmountOnExit>
              <Box sx={{ margin: 1, display: 'flex', flexWrap: 'wrap' }}>
                <Typography variant="h6" gutterBottom component="div" sx={{ width: '100%' }}>
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
  const [groups, setGroups] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchStudentsByGroup = async () => {
      try {
        const studentsByGroup = await getStudentsByGroup();
        setGroups(studentsByGroup.map(group => ({ ...group, show: false, graded: false })));
      } catch (error) {
        console.error("Failed to fetch students by group:", error.message);
      }
    };

    fetchStudentsByGroup();
  }, []);

  const toggleGraded = (groupName) => {
    // Function to toggle the graded status
    setGroups(currentGroups =>
        currentGroups.map(group =>
            group.groupName === groupName ? { ...group, graded: !group.graded } : group
        )
    );
  };

  const filteredGroups = groups.filter(group =>
      group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
      <Box sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
          <img src={grade} alt="ScoreCraft Logo" style={{ width: 50, height: 'auto', marginRight: 10 }} />
          <Typography variant="h4">ScoreCraft</Typography>
          <IconButton onClick={() => navigate('/')}>
            <img src={home} alt="Home Icon" style={{ width: 50, height: 'auto' }} />
          </IconButton>
        </Box>
        <Box sx={{ mt: 2, mx: 2 }}>
          <input
              type="text"
              placeholder="Search Groups"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '100%' }}
          />
        </Box>
        <TableContainer component={Paper} sx={{ mt: 2, mx: 2 }}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell />
                <TableCell>Group Name</TableCell>
                <TableCell>Graded</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredGroups.map((group) => (
                  <GroupRow key={group.groupName} group={group} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
  );
};

export default MainPageGroup;