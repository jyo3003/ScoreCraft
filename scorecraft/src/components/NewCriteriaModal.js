import React, { useState, useEffect } from "react";
import { addGradingCriteria, updateGradingCriteria } from "../api";
import {
    Box,
    Button,
    Modal,
    TextField,
    Typography,
    IconButton,
    MenuItem,
    FormControl,
    InputLabel,
    Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

function NewCriteriaModal({ openModal, setOpenModal, modalData, setModalData }) {
    const specialCharacter = ";";
    const [newCriteria, setNewCriteria] = useState({
        criteriaName: "",
        criteriaScore: "",
        typeOfCriteria: "",
        gradingCriteriaGroupName: "",
        gradedScore: "",
        predefinedComments: "",
    });
    const [predefinedComments, setPredefinedComments] = useState("");
    const [validationErrors, setValidationErrors] = useState({
        totalScore: "",
        emptyFields: "",
        typeOfCriteria: "",
        commentFormat: "",
    });

    useEffect(() => {
        if (modalData && Object.keys(modalData).length > 0) {
            console.log(modalData);
            setNewCriteria(modalData);
            setPredefinedComments(modalData?.predefinedComments.join(specialCharacter));
        } else {
            setNewCriteria({
                criteriaName: "",
                criteriaScore: "",
                typeOfCriteria: "",
                gradingCriteriaGroupName: "",
                gradedScore: "",
                predefinedComments: "",
            });
            setPredefinedComments("");
        }
    }, [modalData]);

    // Function to handle form input changes
    const handleCriteriaChange = (event) => {
        setNewCriteria({
            ...newCriteria,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmitCriteria = async (event) => {
        event.preventDefault(); // Prevent default form submission which refreshes the page

        // Perform validations
        const errors = {};
        if (!Number.isInteger(Number(newCriteria.criteriaScore)) || newCriteria.criteriaScore <= 0) {
            errors.totalScore = "Total score must be a positive integer.";
        }
        if (newCriteria.typeOfCriteria !== "I" && newCriteria.typeOfCriteria !== "G") {
            errors.typeOfCriteria = "Type of criteria must be 'I' or 'G'.";
        }
        if (newCriteria.criteriaName.trim() === "") {
            errors.criteriaName = "Criteria name cannot be empty.";
        }
        if (newCriteria.gradingCriteriaGroupName.trim() === "") {
            errors.gradingCriteriaGroupName = "Grading criteria group name cannot be empty.";
        }
        const comments = predefinedComments.split(";").map((comment) => comment.trim());
        const regex = /\(\d+(\.\d+)?\)/;
        for (let comment of comments) {
            if (!regex.test(comment)) {
                errors.commentFormat = "Comments must be in format '(points) comment'.";
                break;
            }
            const points = parseFloat(comment.match(/\((\d+(\.\d+)?)\)/)[1]);
            if (points < 0 || points > parseFloat(newCriteria.criteriaScore)) {
                errors.commentFormat = "Points must be between 0 and the total score.";
                break;
            }
        }
        if (Object.keys(errors).length > 0) {
            setValidationErrors(errors);
            return;
        }

        const formData = {
            criteriaName: newCriteria.criteriaName,
            criteriaScore: newCriteria.criteriaScore,
            typeOfCriteria: newCriteria.typeOfCriteria,
            gradingCriteriaGroupName: newCriteria.gradingCriteriaGroupName,
            gradedScore: newCriteria.gradedScore,
            predefinedComments: comments,
        };

        try {
            if (!newCriteria.id) {
                await addGradingCriteria(formData);
                alert("Criteria added successfully!");
            } else {
                await updateGradingCriteria(newCriteria.id, formData);
                alert("Criteria updated successfully!");
            }
            setOpenModal(false);
            setValidationErrors({});
        } catch (error) {
            console.error("Error adding/updating criteria:", error);
            alert("Failed to add/update criteria: " + error.message);
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

    const handleModalClose = () => {
        setOpenModal(false);
        setModalData({});
    };

    return (
        <div>
            <Modal
                open={openModal}
                onClose={handleModalClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={modalStyle}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            {modalData && Object.keys(modalData).length > 0 ? "Update Criteria" : "Add New Criteria"}
                        </Typography>
                        <IconButton aria-label="close" onClick={handleModalClose}>
                            <CloseIcon />
                        </IconButton>
                    </div>

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
                            error={!!validationErrors.criteriaName}
                            helperText={validationErrors.criteriaName}
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
                            error={!!validationErrors.totalScore}
                            helperText={validationErrors.totalScore}
                        />
                        <FormControl fullWidth required error={!!validationErrors.typeOfCriteria} sx={{ mt: 1 }}>
                            <InputLabel id="typeOfCriteria-label">Type Of Criteria</InputLabel>
                            <Select
                                labelId="typeOfCriteria-label"
                                label="Type Of Criteria"
                                id="typeOfCriteria"
                                value={newCriteria.typeOfCriteria}
                                onChange={handleCriteriaChange}
                                name="typeOfCriteria"
                            >
                                <MenuItem value="I">I</MenuItem>
                                <MenuItem value="G">G</MenuItem>
                            </Select>
                        </FormControl>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="gradingCriteriaGroupName"
                            label="Grading Criteria Group Name"
                            id="gradingCriteriaGroupName"
                            value={newCriteria.gradingCriteriaGroupName}
                            error={!!validationErrors.gradingCriteriaGroupName}
                            helperText={validationErrors.gradingCriteriaGroupName}
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
                            value={predefinedComments}
                            onChange={(e) => {
                                setPredefinedComments(e.target.value);
                            }}
                            error={!!validationErrors.commentFormat}
                            helperText={validationErrors.commentFormat}
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                            onClick={handleSubmitCriteria}
                        >
                            {modalData && Object.keys(modalData).length > 0 ? "Update" : "Add Criteria"}
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
}

export default NewCriteriaModal;
