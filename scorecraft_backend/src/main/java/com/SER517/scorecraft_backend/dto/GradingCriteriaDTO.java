package com.SER517.scorecraft_backend.dto;

public class GradingCriteriaDTO {
	private String criteriaName;
    private double criteriaScore; // Static score associated with the criteria for reference
    private String typeOfCriteria;
    private String gradingCriteriaGroupName;
    
    
    private double gradedScore; // Dynamic score given to the student
    private String comment; // Comment associated with the student's graded score

    public GradingCriteriaDTO(String criteriaName, double criteriaScore, String typeOfCriteria, 
                                String gradingCriteriaGroupName, double gradedScore, String comment) {
        this.criteriaName = criteriaName;
        this.criteriaScore = criteriaScore;
        this.typeOfCriteria = typeOfCriteria;
        this.gradingCriteriaGroupName = gradingCriteriaGroupName;
        
        
        this.gradedScore = gradedScore; // Nullable to accommodate criteria not yet graded
        this.comment = comment; // Nullable
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

    
    
}
