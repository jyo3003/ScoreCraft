import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import '../css/FileUploadPage.css';
import { uploadFile, checkDataExists, getAssessmentType } from '../api';
import Header from './Header';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [assessmentType, setAssessmentType] = useState('');
  const [dataExists, setDataExists] = useState(null);
  const navigate = useNavigate();
  const uploadSectionRef = useRef(null);

  useEffect(() => {
    const fetchDataExists = async () => {
      try {
        const exists = await checkDataExists();
        setDataExists(exists);
      } catch (error) {
        console.error('Error checking data existence:', error);
        setDataExists(false);
      }
    };
    fetchDataExists();
  }, []);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setUploadStatus(''); // Clear any previous upload status.
  };

  const handleAssessmentTypeSelection = (type) => {
    setAssessmentType(type);
    setTimeout(() => {
      uploadSectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file to upload.');
      return;
    }

    try {
      await uploadFile(selectedFile, 'exampleResourceId');
      setUploadStatus('File uploaded successfully.');
      setSelectedFile(null); // Clear the file input after successful upload
      navigate(`/${assessmentType}`);
    } catch (error) {
      let errorMessage = "An error occurred. Please try again.";
      if (error.response) {
        errorMessage = error.response.data.message || "Error connecting to the server.";
      } else if (error.request) {
        errorMessage = "The server did not respond. Please check your internet connection and try again.";
      } else {
        errorMessage = error.message;
      }
      console.error('Error uploading file:', errorMessage);

      // Show alert with error message, then clear the message to allow for a new attempt.
      alert(errorMessage); // Display the error to the user
      setUploadStatus(''); // Clear the status to reset the state
    }
  };

  const determineAssessmentTypeAndNavigate = async () => {
    try {
      const isGroup = await getAssessmentType();
      if (isGroup) {
        navigate('/MainPageGroup');
      } else {
        navigate('/MainPageIndividual');
      }
    } catch (error) {
      console.error('Error determining assessment type:', error);
      setUploadStatus("Failed to determine assessment type. Please try again.");
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
            <p>Do you want to use the existing data?</p>
            <button onClick={determineAssessmentTypeAndNavigate}>Yes</button>
            <button onClick={() => setDataExists(false)}>No</button>
          </div>
        ) : (
          <>
            <div className="grading-criteria">
              <p>Is this grading criteria for a group or an individual assessment?</p>
              <button onClick={() => handleAssessmentTypeSelection('MainPageGroup')}>Group</button>
              <button onClick={() => handleAssessmentTypeSelection('MainPageIndividual')}>Individual</button>
            </div>
            <div ref={uploadSectionRef} className={`file-upload-section ${assessmentType ? 'active' : ''}`}>
              <h2>File Upload</h2>
              <input type="file" onChange={handleFileChange} accept=".xls, .xlsx" />
              <button onClick={handleUpload}>Upload File</button>
              {uploadStatus && <p className="upload-status">{uploadStatus}</p>}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default FileUploadPage;