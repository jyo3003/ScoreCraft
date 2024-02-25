package com.SER517.scorecraft_backend.model;

import javax.persistence.*;

@Entity
@Table(name = "grading_criteria")
public class GradingCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "criteria_name", nullable = false, length = 100)
    private String criteriaName;

    @Column(name = "score")
    private int score;

    @Column(name = "type_of_criteria", length = 50)
    private String typeOfCriteria;

    @Column(name = "grading_criteria_group_name", length = 100)
    private String gradingCriteriaGroupName;

    // Getters and setters
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