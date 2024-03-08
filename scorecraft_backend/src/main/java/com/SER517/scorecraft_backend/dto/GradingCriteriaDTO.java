package com.SER517.scorecraft_backend.dto;

public class GradingCriteriaDTO {
    private Long id;  // New field
    private String criteriaName;
    private double score;
    private String typeOfCriteria;
    private String gradingCriteriaGroupName;

    // Constructors

    public GradingCriteriaDTO() {
    }

    public GradingCriteriaDTO(Long id, String criteriaName, double d, String typeOfCriteria, String gradingCriteriaGroupName) {
        this.id = id;
        this.criteriaName = criteriaName;
        this.score = d;
        this.typeOfCriteria = typeOfCriteria;
        this.gradingCriteriaGroupName = gradingCriteriaGroupName;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getCriteriaName() {
        return criteriaName;
    }

    public void setCriteriaName(String criteriaName) {
        this.criteriaName = criteriaName;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
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
