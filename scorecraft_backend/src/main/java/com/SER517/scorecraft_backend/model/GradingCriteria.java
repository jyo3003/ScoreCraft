package com.ser517.scorecraft_backend.model;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

@Entity
public class GradingCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String criteriaName;
    private int score;

    // Constructors
    public GradingCriteria() {
    }

    public GradingCriteria(String criteriaName, int score) {
        this.criteriaName = criteriaName;
        this.score = score;
    }

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
}