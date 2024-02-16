import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import './FileUploadPage.css'; // Import CSS file for styling
import { uploadFile } from './api'; // Ensure the path is correct based on your project structure

function FileUploadPage() {
  const [file, setFile] = useState(null);
  const [fileInfo, setFileInfo] = useState('');

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = () => {
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (fileExtension === 'xlsx') { // Only allow .xlsx files
        // Upload using Axios
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:8080/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          setFileInfo(`File "${fileName}" uploaded successfully!`);
          // Additional logic after successful upload
        }).catch(error => {
          setFileInfo('Upload to backend failed');
        });

        // Upload using custom uploadFile function
        uploadFile(file).then(response => {
          setFileInfo(`File "${fileName}" uploaded successfully!`);
          // Additional logic after successful upload
        }).catch(error => {
          setFileInfo('Upload to backend failed');
        });
      } else {
        setFileInfo('Invalid file format. Please upload an Excel file (.xlsx).');
      }
    } else {
      setFileInfo('Please select a file to upload.');
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Your Assignment Here</h2>
      <div className="upload-section">
        <input
          type="file"
          id="file-input"
          accept=".xlsx"
          onChange={handleFileChange}
        />
        <button onClick={handleUpload} className="upload-button">Upload</button>
      </div>
      <div className="file-info">{fileInfo}</div>
    </div>
  );
}

export default FileUploadPage;
