import React, { useState } from 'react';
import '../css/GradingPage.css';
import { AgGridReact } from "ag-grid-react"; // React Grid Logic
import "ag-grid-community/styles/ag-grid.css"; // Core CSS
import "ag-grid-community/styles/ag-theme-quartz.css"; // Theme
import Header from './Header';

function GradingPage() {

    const [gradingGroups, setGradingGroups] = useState([]);

    useEffect(() => {
        const fetchAllGradingGroups = async () => {
            try {
                const data = await gradingAPI.getAllGradingGroups();
                console.log('Received data:', data); // Log the data for debugging
                setGradingGroups(data); // Set the data as received
            } catch (error) {
                console.error("Failed to fetch grading groups:", error.message);
                // Handle error state appropriately
            }
        };

        fetchAllGradingGroups();
    }, []);
    // Row Data: The data to be displayed.
    const [rowData, setRowData] = useState([
        { make: "Tesla", model: "Model Y", price: 64950, electric: true },
        { make: "Ford", model: "F-Series", price: 33850, electric: false },
        { make: "Toyota", model: "Corolla", price: 29600, electric: false },
        { make: 'Mercedes', model: 'EQA', price: 48890, electric: true },
        { make: 'Fiat', model: '500', price: 15774, electric: false },
        { make: 'Nissan', model: 'Juke', price: 20675, electric: false },
    ]);

    const [colDefs, setColDefs] = useState([
        { field: "make" },
        { field: "model" },
        { field: "price" },
        { field: "electric" }
    ]);

    return (
        <>
            <Header />
            {/* <div style={{ height: 'calc(100vh - 100px)', width: '100%', paddingTop:'100px' }} className="ag-theme-quartz">
                <AgGridReact rowData={rowData} columnDefs={colDefs} />
            </div> */}
                        <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Criteria Name</th>
                        <th>Score</th>
                        <th>Type of Criteria</th>
                        <th>Grading Criteria Group Name</th>
                    </tr>
                </thead>
                <tbody>
                    {gradingGroups.map(group => 
                        group.gradingCriteria.map((criteria, index) => (
                            <tr key={index}>
                                {/* Accessing each criteria fields from the gradingCriteria array */}
                                <td>{criteria.id}</td>
                                <td>{criteria.criteriaName}</td>
                                <td>{criteria.score}</td>
                                <td>{criteria.typeOfCriteria}</td>
                                <td>{group.gradingCriteriaGroupName}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

        </>
    );
}

export default GradingPage;
