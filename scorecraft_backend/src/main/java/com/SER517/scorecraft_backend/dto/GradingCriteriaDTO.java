package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class GradingCriteriaDTO {
	
	private Long gradingID;
	private String criteriaName;
    private double criteriaScore; // Static score associated with the criteria for reference
    private String typeOfCriteria;
    private String gradingCriteriaGroupName;
    private List<String> predefinedComments; // List of predefined comments for the grading criteria
    
    
    
    private double gradedScore; // Dynamic score given to the student
    private String comment; // Comment associated with the student's graded score

    public GradingCriteriaDTO(Long gradingID, String criteriaName, double criteriaScore, String typeOfCriteria, 
            String gradingCriteriaGroupName, double gradedScore, String comment, 
            List<String> predefinedComments) {
		this.gradingID = gradingID;
		this.criteriaName = criteriaName;
		this.criteriaScore = criteriaScore;
		this.typeOfCriteria = typeOfCriteria;
		this.gradingCriteriaGroupName = gradingCriteriaGroupName;
		this.gradedScore = gradedScore; // Nullable to accommodate criteria not yet graded
		this.comment = comment; // Nullable
		this.predefinedComments = predefinedComments; // Can be empty if no predefined comments
    }
    
    public List<String> getPredefinedComments() {
        return predefinedComments;
    }

    public void setPredefinedComments(List<String> predefinedComments) {
        this.predefinedComments = predefinedComments;
    }

	public String getCriteriaName() {
		return criteriaName;
	}

	public void setCriteriaName(String criteriaName) {
		this.criteriaName = criteriaName;
	}

	public double getCriteriaScore() {
		return criteriaScore;
	}

	public void setCriteriaScore(double criteriaScore) {
		this.criteriaScore = criteriaScore;
	}

	public String getTypeOfCriteria() {
		return typeOfCriteria;
	}

	public void setTypeOfCriteria(String typeOfCriteria) {
		this.typeOfCriteria = typeOfCriteria;
	}

	public String getGradingCriteriaGroupName() {
		return gradingCriteriaGroupName;
	}

	public void setGradingCriteriaGroupName(String gradingCriteriaGroupName) {
		this.gradingCriteriaGroupName = gradingCriteriaGroupName;
	}

	public double getGradedScore() {
		return gradedScore;
	}

	public void setGradedScore(double gradedScore) {
		this.gradedScore = gradedScore;
	}

	public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}

	public Long getId() {
		return gradingID;
	}

	public void setId(Long gradingID) {
		this.gradingID = gradingID;
	}

    
    
}
