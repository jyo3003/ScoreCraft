import React from 'react';
import '../css/GradingPage.css'
import grade from '../images/Grade.png';
import home from '../images/home.png';
import { useNavigate } from 'react-router-dom';

export default function GradingPage(){
    const navigate = useNavigate();
    return (
        <div><header className="header">
        <img src={grade} alt="ScoreCraft Logo" className="pencil-logo" />
        <h1>ScoreCraft</h1>
        <button onClick={() => navigate('/')} className="home-button">
          <img src={home} alt="Home Icon" />
        </button>
      </header>
</div>
    )
}