import React from "react";

function Modal({ openModal, setOpenModal, handleSubmitCriteria }) {
    const [newCriteria, setNewCriteria] = useState({
        criteriaName: "",
        criteriaScore: "",
        typeOfCriteria: "",
        gradingCriteriaGroupName: "",
        gradedScore: "",
        comment: "",
    });
    // Function to handle form input changes
    const handleCriteriaChange = (event) => {
        setNewCriteria({
            ...newCriteria,
            [event.target.name]: event.target.value,
        });
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
                    <Typography
                        id="modal-modal-title"
                        variant="h6"
                        component="h2"
                    >
                        Add New Criteria
                    </Typography>
                    <Box
                        component="form"
                        noValidate
                        autoComplete="off"
                        sx={{ mt: 1 }}
                    >
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
                            name="gradedScore"
                            label="Graded Score"
                            type="number"
                            id="gradedScore"
                            value={newCriteria.gradedScore}
                            onChange={handleCriteriaChange}
                        />
                        <TextField
                            margin="normal"
                            fullWidth
                            name="comment"
                            label="Comment"
                            id="comment"
                            multiline
                            rows={4}
                            value={newCriteria.comment}
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

export default Modal;
