import React, { useState } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useDropzone } from 'react-dropzone'; // Import useDropzone hook from react-dropzone
import './FileUploadPage.css'; // Import CSS file for styling
import { uploadFile } from './api'; // Ensure the path is correct based on your project structure

function FileUploadPage() {
  const [file, setFile] = useState(null); // Define the file state
  const [fileInfo, setFileInfo] = useState('');

  const handleUpload = () => {
    if (file) {
      const fileName = file.name;
      const fileExtension = fileName.split('.').pop().toLowerCase();

      if (fileExtension === 'xlsx') { // Only allow .xlsx files
        // Upload using Axios
        const formData = new FormData();
        formData.append('file', file);

        axios.post('http://localhost:3000/FileUpload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(response => {
          setFileInfo(`File "${fileName}" uploaded successfully!`);
          uploadFile(file).then(response => {
            setFileInfo(`File "${fileName}" uploaded successfully!`);
            
          }).catch(error => {
            setFileInfo('Failed to save the file'); // File upload to backend unsucecssful
          });
          // Additional logic after successful upload
        }).catch(error => {
          setFileInfo('Failed to upload the file');
        });

        
        
      } else {
        setFileInfo('Invalid file format. Please upload an Excel file (.xlsx).');
      }
    } else {
      setFileInfo('Please select a file to upload.');
    }
  };

  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const fileName = file.name;
    const fileExtension = fileName.split('.').pop().toLowerCase();

    if (fileExtension === 'xlsx') {
      setFile(file); // Set the file state when a file is dropped or selected
      setFileInfo('');
    } else {
      setFileInfo('Invalid file format. Please upload a valid file (.xlsx).');
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div className="upload-container">
      <h2>Upload Your Assignment Here</h2>
      <div {...getRootProps()} className="dropzone">
        <input {...getInputProps()} accept=".xlsx" />
        <p>Drag 'n' drop an Excel file here, or click to select a file</p>
      </div>
      <button onClick={handleUpload} className="upload-button">Upload</button>
      <div className="file-info">{fileInfo}</div>
    </div>
  );
}

export default FileUploadPage;
