import React, { useState } from 'react';
import './FileUploadPage.css'; // Import CSS file for styling

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
        setFileInfo(`File "${fileName}" uploaded successfully!`);
        // You can upload the file to the server or perform additional actions here
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
