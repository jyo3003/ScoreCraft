import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FileUploadPage.css';
import grade from '../images/Grade.png';
import home from '../images/home.png';
import { uploadFile } from '../api';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const navigate = useNavigate();
  const uploadSectionRef = useRef(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleAssessmentTypeSelection = (type) => {
    setAssessmentType(type);
    setTimeout(() => { // Adding a timeout to ensure the section is visible for scrolling
      uploadSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    try {
      const resourceId = 'exampleResourceId'; // Placeholder, replace with actual logic
      await uploadFile(selectedFile, resourceId);
      setUploadStatus('File Upload Successful');
      setSelectedFile(null);
      navigate(`/${assessmentType}`);
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(error.message || 'Error uploading file');
    }
  };

  return (
    <div>
      <header className="header">
        <img src={grade} alt="ScoreCraft Logo" className="pencil-logo" />
        <h1>ScoreCraft</h1>
        <button onClick={() => navigate('/')} className="home-button">
          <img src={home} alt="Home Icon" />
        </button>
      </header>

      <div className="container">
        {!assessmentType ? (
          <div className="grading-criteria">
            <p className="grading-question">Is this grading criteria for a group or an individual assessment?</p>
            <button type="button" onClick={() => handleAssessmentTypeSelection('MainPageGroup')}>Group</button>
            <button type="button" onClick={() => handleAssessmentTypeSelection('MainPageIndividual')}>Individual</button>
          </div>

        ) : null}

        <div ref={uploadSectionRef} className={`file-upload-section ${assessmentType ? 'active' : ''}`}>
          <h2>File Upload</h2>
          <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
          <button type="button" onClick={handleUpload} className="upload-button">Upload File</button>
          {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
        </div>
      </div>
    </div>

  );
}

export default FileUploadPage;