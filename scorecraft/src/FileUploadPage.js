import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './FileUploadPage.css';
import grade from './Grade.png';

function FileUploadPage() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const navigate = useNavigate();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      if (!selectedFile) {
        throw new Error('Please select a file.');
      }

      const data = await uploadFile(selectedFile);
      console.log('File upload success:', data);
      setUploadStatus('File Upload Successful');
      setSelectedFile(null);
      document.getElementById('file-upload-form').reset(); // reset page
      // navigate('/path-to-success-page'); 
    } catch (error) {
      console.error('Error:', error);
      setUploadStatus('Error uploading file');
    }
  };

  const navigateToPage = (page) => {
    navigate(`/${page}`); // Make sure the page paths are correctly defined in your router
  };

  return (
    <div className="file-upload-container">
      <div className="file-upload-header">
           <img src={grade} alt="Img" className="pencil-logo"/>
        <h1>ScoreCraft</h1>
        <input type="file" onChange={handleFileChange} accept=".xls,.xlsx" />
        <button onClick={handleUpload} className="upload-button">Upload File</button>
        {uploadStatus && <p>{uploadStatus}</p>} {/* Display upload status */}
      </div>
      <div className="grading-criteria">
        <p>Is this grading criteria for a group or an individual assessment?</p>
        <button onClick={() => navigateToPage('MainPageGroup')}>Group</button>
        <button onClick={() => navigateToPage('MainPageIndividual')}>Individual</button>
      </div>
    </div>
  );
};

export default FileUploadPage;
