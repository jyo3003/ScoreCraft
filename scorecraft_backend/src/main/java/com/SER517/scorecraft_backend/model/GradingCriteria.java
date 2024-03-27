package com.SER517.scorecraft_backend.model;

import java.util.List;

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
    
    


	@Column(name = "type_of_criteria", length = 50)
    private String typeOfCriteria;

    @Column(name = "grading_criteria_group_name", length = 100)
    private String gradingCriteriaGroupName;
    
    @ElementCollection
    @CollectionTable(name = "grading_criteria_comments", joinColumns = @JoinColumn(name = "grading_criteria_id"))
    @Column(name = "comment")
    private List<String> comments; // Using @ElementCollection to store multiple comments

    // Getters and Setters

    public List<String> getComments() {
        return comments;
    }

    public void setComments(List<String> comments) {
        this.comments = comments;
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
    
    
}