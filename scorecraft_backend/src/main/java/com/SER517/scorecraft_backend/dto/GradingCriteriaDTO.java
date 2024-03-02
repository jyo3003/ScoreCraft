package com.SER517.scorecraft_backend.dto;

public class GradingCriteriaDTO {
    private String criteriaName;
    private int score;
    private String typeOfCriteria;
    private String gradingCriteriaGroupName;

    // Constructors

    public GradingCriteriaDTO() {
    }

    public GradingCriteriaDTO(String criteriaName, int score, String typeOfCriteria, String gradingCriteriaGroupName) {
        this.criteriaName = criteriaName;
        this.score = score;
        this.typeOfCriteria = typeOfCriteria;
        this.gradingCriteriaGroupName = gradingCriteriaGroupName;
    }

    // Getters and Setters

    public String getCriteriaName() {
        return criteriaName;
    }

    public void setCriteriaName(String criteriaName) {
        this.criteriaName = criteriaName;
    }

    public int getScore() {
        return score;
    }

    public void setScore(int score) {
        this.score = score;
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
}

