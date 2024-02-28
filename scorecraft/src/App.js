import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FileUploadPage from './FileUploadPage';
import MainPage from './MainPage';
import './App.css';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/FileUploadPage" element={<FileUploadPage />} />
        <Route path="/MainPage" element={<MainPage />} />
      </Routes>
    </Router>
  );
}

export default App;
