package com.ser517.scorecraft_backend.model;

import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;

@Entity
public class Student {

	@Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String groupName;
    private String asurite;

    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<GradingCriteria> gradingCriteria;

    // Constructors
    public Student() {
    }

    public Student(String groupName, String asurite, List<GradingCriteria> gradingCriteria) {
        this.groupName = groupName;
        this.asurite = asurite;
        this.gradingCriteria = gradingCriteria;
    }

    // Getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

    public String getAsurite() {
        return asurite;
    }

    public void setAsurite(String asurite) {
        this.asurite = asurite;
    }

    public List<GradingCriteria> getGradingCriteria() {
        return gradingCriteria;
    }

    public void setGradingCriteria(List<GradingCriteria> gradingCriteria) {
        this.gradingCriteria = gradingCriteria;
    }
}