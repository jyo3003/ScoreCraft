package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class CriteriaDTO {

    private Long gradingID;
	private String criteriaName;
    private double criteriaScore; // Static score associated with the criteria for reference
    private String typeOfCriteria;
    private String gradingCriteriaGroupName;
    private List<String> predefinedComments; // List of predefined comments for the grading criteria

    public CriteriaDTO(Long gradingID, String criteriaName, double criteriaScore, String typeOfCriteria, 
            String gradingCriteriaGroupName, double gradedScore, List<String> predefinedComments) {
		this.gradingID = gradingID;
		this.criteriaName = criteriaName;
		this.criteriaScore = criteriaScore;
		this.typeOfCriteria = typeOfCriteria;
		this.gradingCriteriaGroupName = gradingCriteriaGroupName;
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

	public Long getId() {
		return gradingID;
	}

	public void setId(Long gradingID) {
		this.gradingID = gradingID;
	}

    
}
