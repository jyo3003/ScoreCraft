import LoginPage from './LoginPage';
import FileUploadPage from './FileUploadPage';
import RegistrationPage from './RegistrationPage'
import './App.css';
import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
;

function App() {
  useEffect(() => {
    // Fetch data from Spring Boot backend
    axios.get('http://localhost:8080/api/data')
        .then(response => {
            // Handle the data in your React component
            console.log(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
    }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path='/fileupload' element = {<FileUploadPage />} />
          <Route path='/registration' element = {<RegistrationPage />} />
        </Routes>
        <h1>Score Craft</h1> {/* Move "Score Craft" heading outside LoginPage */}
      </div>
    </Router>
  );
}

export default App;
