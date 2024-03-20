import React from 'react';
import { useNavigate } from 'react-router-dom';
import { IconButton, Typography } from '@mui/material';
import grade from '../images/Grade.png';
import home from '../images/home.png';

function Header() {
const navigate = useNavigate();
  return (
    <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', background: 'linear-gradient(rgba(58, 106, 67, 0.744), rgba(0, 0, 0, 1.5))' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
            <img src={grade} alt="ScoreCraft Logo" style={{ width: 50, height: 'auto', marginRight: 10 }} />
            <Typography variant="h4" style={{ color: '#fff', fontFamily: 'Segoe UI',fontWeight: 'bold'}}>ScoreCraft</Typography>
        </div>
        <IconButton onClick={() => navigate('/')}>
            <img src={home} alt="Home Icon" style={{ width: 50, height: 'auto' }} />
        </IconButton>
    </header>
  )
}

export default Header