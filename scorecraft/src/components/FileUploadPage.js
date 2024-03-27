import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FileUploadPage.css';
import {  uploadFile, checkDataExists, getAssessmentType  } from '../api';
import Header from './Header';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [dataExists, setDataExists] = useState(null); // State to track data existence
  const navigate = useNavigate();
  const uploadSectionRef = useRef(null);


  useEffect(() => {
    // Perform the check for existing data on component mount
    const fetchDataExists = async () => {
      try {
        const exists = await checkDataExists();
        setDataExists(exists);
      } catch (error) {
        console.error('Error checking data existence:', error);
        setDataExists(false); // Assume no data exists on error
      }
    };
    
    fetchDataExists();
  }, []);

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

  const determineAssessmentTypeAndNavigate = async () => {
    try {
      const isGroup = await getAssessmentType(); // Placeholder for your logic to determine assessment type
      if (isGroup) {
        navigate('/MainPageGroup');
      } else {
        navigate('/MainPageIndividual');
      }
    } catch (error) {
      console.error('Error determining assessment type:', error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container">
        {dataExists === null ? (
          <p>Checking for existing data...</p>
        ) : dataExists ? (
          <div className="data-exists-question">
            <p className="data" style={{color:'#000'}}>Do you want to use the existing data?</p>
            <button type="button" onClick={determineAssessmentTypeAndNavigate}>Yes</button>
            <button type="button" onClick={() => setDataExists(false)}>No</button>
          </div>
        ) : (
          <>
            <div className="grading-criteria">
              <p className="grading-question" style={{color:'#000'}}>Is this grading criteria for a group or an individual assessment?</p>
              <button type="button" onClick={() => handleAssessmentTypeSelection('MainPageGroup')}>Group</button>
              <button type="button" onClick={() => handleAssessmentTypeSelection('MainPageIndividual')}>Individual</button>
            </div>
            <div ref={uploadSectionRef} className={`file-upload-section ${assessmentType ? 'active' : ''}`}>
              <h2 style={{color:'#000'}}>File Upload</h2>
              <input type="file" style={{color:'#000'}} onChange={handleFileChange} accept=".xls,.xlsx" />
              <button type="button" onClick={handleUpload} className="upload-button">Upload File</button>
              {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );

}

export default FileUploadPage;