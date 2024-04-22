package com.SER517.scorecraft_backend.model;

import jakarta.persistence.*;

@Entity
@Table(name = "student_grading")
public class StudentGrading {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "student_id", nullable = false)
    private Student student;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "criteria_id", nullable = false)
    private GradingCriteria gradingCriteria;

    @Column(name = "score")
    private double score;

    @Column(name = "comment", length = 512)
    private String comment;

    @Column(name = "checkbox", nullable = true)
    private Boolean checkbox;

    // Default constructor
    public StudentGrading() {
    }

    // Full constructor
    public StudentGrading(Student student, GradingCriteria gradingCriteria, double score, String comment, Boolean checkbox) {
        this.student = student;
        this.gradingCriteria = gradingCriteria;
        this.score = score;
        this.comment = comment;
        this.checkbox = checkbox;
    }

    public Boolean getCheckbox() {
        return checkbox;
    }

    public void setCheckbox(Boolean checkbox) {
        this.checkbox = checkbox;
    }

    // Getters and Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Student getStudent() {
        return student;
    }

    public void setStudent(Student student) {
        this.student = student;
    }

    public GradingCriteria getGradingCriteria() {
        return gradingCriteria;
    }

    public void setGradingCriteria(GradingCriteria gradingCriteria) {
        this.gradingCriteria = gradingCriteria;
    }

    public double getScore() {
        return score;
    }

    public void setScore(double score) {
        this.score = score;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }
}

