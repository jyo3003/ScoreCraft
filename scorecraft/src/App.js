import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import FileUploadPage from './components/FileUploadPage';
import MainPageIndividual from './components/MainPageIndividual';
import MainPageGroup from './components/MainPageGroup';
import GradingPageIndividual from './components/GradingPageIndividual';
import GradingPageGroup from './components/GradingPageGroup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/FileUploadPage" />} />
        <Route path="/FileUploadPage" element={<FileUploadPage />} />
        <Route path="/MainPageIndividual" element={<MainPageIndividual />} />
        <Route path="/MainPageGroup" element={<MainPageGroup />} />
        <Route path="/GradingPageIndividual" element={<GradingPageIndividual />} />
        <Route path="/GradingPageGroup" element={<GradingPageGroup />} />
      </Routes>
    </Router>
  );
}

export default App;
