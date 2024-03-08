package com.SER517.scorecraft_backend.model;

import jakarta.persistence.*;
import java.util.List;

@Entity
@Table(name = "student") // Specify the table name if different from class name
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "group_name") // Specify the column name if different from the field name
    private String groupName;

    @Column(name = "asurite")
    private double asurite;

    @Column(name = "final_comment")
    private String finalComment;

    @Column(name = "final_score")
    private double finalscore;

    @Column(name = "student_name")
    private String studentName;
    
    @Column(name = "grading_status")
    private String gradingStatus;

//    @OneToMany(mappedBy = "student", cascade = CascadeType.ALL, orphanRemoval = true)
//    private List<GradingCriteria> gradingCriteria;

    

	// Constructors
    public Student() {
    }

    public Student(String groupName, double asurite) {
        this.groupName = groupName;
        this.asurite = asurite;
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

    public double getAsurite() {
        return asurite;
    }

    public void setAsurite(double asurite) {
        this.asurite = asurite;
    }

//    public List<GradingCriteria> getGradingCriteria() {
//        return gradingCriteria;
//    }
//
//    public void setGradingCriteria(List<GradingCriteria> gradingCriteria) {
//        this.gradingCriteria = gradingCriteria;
//    }

    public String getFinalComment() {
        return finalComment;
    }

    public void setFinalComment(String finalComment) {
        this.finalComment = finalComment;
    }

    public double getFinalscore() {
        return finalscore;
    }

    public void setFinalscore(double finalscore) {
        this.finalscore = finalscore;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
    public String getGradingStatus() {
		return gradingStatus;
	}

	public void setGradingStatus(String gradingStatus) {
		this.gradingStatus = gradingStatus;
	}
}