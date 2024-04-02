import React, { useState, useEffect } from "react";
import { addGradingCriteria } from "../api";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";

function NewCriteriaModal({ openModal, setOpenModal }) {
    const [newCriteria, setNewCriteria] = useState({
        criteriaName: "",
        criteriaScore: "",
        typeOfCriteria: "",
        gradingCriteriaGroupName: "",
        gradedScore: "",
        comments: "",
    });
    // Function to handle form input changes
    const handleCriteriaChange = (event) => {
        setNewCriteria({
            ...newCriteria,
            [event.target.name]: event.target.value,
        });
    };

    function breakString(inputString, specialCharacter) {
        // Split the input string based on the special character
        const substrings = inputString.split(specialCharacter);
        return substrings;
    }

    const handleSubmitCriteria = async (event) => {
        event.preventDefault(); // Prevent default form submission which refreshes the page

        const inputString = newCriteria.comments;
        const specialCharacter = ";";
        const resultingPredefinedCommentsList = breakString(inputString, specialCharacter);

        const formData = {
            criteriaName: newCriteria.criteriaName,
            criteriaScore: newCriteria.criteriaScore,
            typeOfCriteria: newCriteria.typeOfCriteria,
            gradingCriteriaGroupName: newCriteria.gradingCriteriaGroupName,
            gradedScore: newCriteria.gradedScore,
            predefinedComments: resultingPredefinedCommentsList,
        };

        try {
            await addGradingCriteria(formData);
            alert("Criteria added successfully!");
            setOpenModal(false);
        } catch (error) {
            console.error("Error adding criteria:", error);
            alert("Failed to add criteria: " + error.message);
        }
    };

    // Modal styling
    const modalStyle = {
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 400,
        bgcolor: "background.paper",
        border: "2px solid #000",
        boxShadow: 24,
        p: 4,
    };
    return (
        <div>
            <Modal
                open={openModal}
                onClose={() => setOpenModal(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Add New Criteria
                    </Typography>
                    <Box component="form" noValidate autoComplete="off" sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="criteriaName"
                            label="Criteria Name"
                            name="criteriaName"
                            autoFocus
                            value={newCriteria.criteriaName}
                            onChange={handleCriteriaChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="criteriaScore"
                            label="Criteria Score"
                            type="number"
                            id="criteriaScore"
                            value={newCriteria.criteriaScore}
                            onChange={handleCriteriaChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="typeOfCriteria"
                            label="Type Of Criteria"
                            id="typeOfCriteria"
                            value={newCriteria.typeOfCriteria}
                            onChange={handleCriteriaChange}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gradingCriteriaGroupName"
                            label="Grading Criteria Group Name"
                            id="gradingCriteriaGroupName"
                            value={newCriteria.gradingCriteriaGroupName}
                            onChange={handleCriteriaChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="comments"
                            label="Comments"
                            id="comments"
                            multiline
                            rows={4}
                            value={newCriteria.comments}
                            onChange={handleCriteriaChange}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitCriteria}
                        >
                            Submit
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NewCriteriaModal;
