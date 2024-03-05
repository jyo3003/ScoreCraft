import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';
import '../css/MainPageGroup.css';
import grade from '../images/Grade.png';

const MainPageGroup = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const groups = [];

    // This would be used to filter the displayed groups based on the search term
    const filteredGroups = groups.filter(group =>
        group.groupName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleExport = () => {
        exportToCSV(filteredGroups, 'groups_export');
    };

    // Function to navigate to the home page (FileUploadPage)
    const goToHome = () => {
        navigate('/FileUploadPage');
    };

    // Function to export filtered groups to Excel
    const exportToCSV = (csvData, fileName) => {
        const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
        const fileExtension = '.xlsx';

        const ws = XLSX.utils.json_to_sheet(csvData);
        const wb = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        const data = new Blob([excelBuffer], {type: fileType});
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    return (
        <div className="main-page-group">
            <div className="header-container">
                <img src={grade} alt="Img" className="pencil-logo" />
                <span className="header-title">ScoreCraft</span>
            </div>
            <div className="content-container">
                <button onClick={goToHome} className="home-button">Home</button>
                <div className="search-bar">
                    <input
                        type="text"
                        placeholder="Search Students"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    <button onClick={handleExport} className="export-button">Export</button>
                </div>
                <table className="groups-table">
                    <thead>
                        <tr>
                            <th>Group Name</th>
                            <th>Student Count</th>
                            <th>Graded</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredGroups.map((group, index) => (
                            <tr key={index}>
                                <td>{group.groupName}</td>
                                <td>{group.studentCount} Students</td>
                                <td>{group.graded ? '✔️' : ''}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MainPageGroup;
