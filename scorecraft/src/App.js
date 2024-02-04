import LoginPage from './LoginPage';
import FileUploadPage from './FileUploadPage';
import './App.css';
import React from 'react';
;

function App() {
  return (
    <div className="App">
      <h1>Score Craft</h1> {/* Move "Score Craft" heading outside LoginPage */}
      <LoginPage />
      <FileUploadPage/>
    
  </div>
  );
}

export default App;
