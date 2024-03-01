import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileUploadPage.css';
import grade from './Grade.png';
import { uploadFile } from './api';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  // Example: Adjust this to obtain the resourceId dynamically if needed
  const resourceId = 'exampleResourceId'; // Placeholder, replace with actual logic to get resourceId

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadStatus('Please select a file.');
      return;
    }

    try {
      // Ensure you pass all required parameters to the uploadFile function
      await uploadFile(selectedFile, resourceId);
      console.log('File upload success');
      setUploadStatus('File Upload Successful'); // Display success message
      setSelectedFile(null);

      // Resetting the form to clear the file input after successful upload
      document.getElementById('file-upload-form')?.reset();

      // Optional: Navigate to another page if needed
      // navigate('/path-to-success-page');
    } catch (error) {
      console.error('Error uploading file:', error);
      setUploadStatus(error.message || 'Error uploading file'); // Display error message
    }
  };

  // Navigation function, adjust or remove according to your app's needs
  const navigateToPage = (page) => {
    navigate(`/${page}`);
  };

  return (
    <div className="file-upload-container">
      <form id="file-upload-form">
        <div className="file-upload-header">
          <img src={grade} alt="Img" className="pencil-logo"/>
          <h1>ScoreCraft</h1>
          <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
          <button type="button" onClick={handleUpload} className="upload-button">Upload File</button>
          {uploadStatus && <p>{uploadStatus}</p>}
        </div>
      </form>
      <div className="grading-criteria">
        <p>Is this grading criteria for a group or an individual assessment?</p>
        <button type="button" onClick={() => navigateToPage('MainPageGroup')}>Group</button>
        <button type="button" onClick={() => navigateToPage('MainPageIndividual')}>Individual</button>
      </div>
    </div>
  );
}

export default FileUploadPage;
