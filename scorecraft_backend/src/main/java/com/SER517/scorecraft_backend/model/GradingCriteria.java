package com.SER517.scorecraft_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "grading_criteria")
public class GradingCriteria {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id", nullable = false, updatable = false)
    private Long id;

    @Column(name = "criteria_name", nullable = false, length = 512)
    private String criteriaName;

    @Column(name = "score")
    private double score;
    
    @Column(name = "gradedScore")
    private double gradedScore = 0.0;


	@Column(name = "type_of_criteria", length = 50)
    private String typeOfCriteria;

    @Column(name = "grading_criteria_group_name", length = 100)
    private String gradingCriteriaGroupName;
    
    @Column(name = "comment", length = 512)
    private String comment;
    

    

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

    public double getScore() {
        return score;
    }

    public void setScore(double d) {
        this.score = d;
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
    
    public String getComment() {
		return comment;
	}

	public void setComment(String comment) {
		this.comment = comment;
	}
	public double getGradedScore() {
		return gradedScore;
	}

	public void setGradedScore(double gradedScore) {
		this.gradedScore = gradedScore;
	}
}