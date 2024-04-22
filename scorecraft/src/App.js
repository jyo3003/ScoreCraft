import React from "react";
import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
} from "react-router-dom";
import FileUploadPage from "./components/FileUploadPage";
import MainPageIndividual from "./components/MainPageIndividual";
import MainPageGroup from "./components/MainPageGroup";
import GradingPage from "./components/GradingPage";

function App() {

    const handleFileUpload = (file) => {

        console.log("File uploaded:", file);
    };


    const handleGrading = (grades) => {

        console.log("Grades submitted:", grades);
    };


    const handleNavigation = (path) => {

        console.log("Navigating to:", path);
    };

    return (
        <Router>
            <Routes>
                <Route path="/" element={<Navigate to="/FileUploadPage" />} />
                <Route path="/FileUploadPage" element={<FileUploadPage onFileUpload={handleFileUpload} />} />
                <Route
                    path="/MainPageIndividual"
                    element={<MainPageIndividual onNavigation={handleNavigation} />}
                />
                <Route path="/MainPageGroup" element={<MainPageGroup onNavigation={handleNavigation} />} />
                <Route path="/GradingPage" element={<GradingPage onGrading={handleGrading} />} />
            </Routes>
        </Router>
    );
}

export default App;
