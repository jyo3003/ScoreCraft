package com.SER517.scorecraft_backend.dto;

public class StudentGradeDTO {
    private Long studentId;
    private Long criteriaId;
    private double score;
    private String comment;
    private boolean checkbox;



    // Default constructor
    public StudentGradeDTO() {
    }

    // Full constructor
    public StudentGradeDTO(Long studentId, Long criteriaId, double score, String comment, boolean checkbox) {
        this.studentId = studentId;
        this.criteriaId = criteriaId;
        this.score = score;
        this.comment = comment;
        this.checkbox = checkbox;
    }

    // Getters and setters
    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public Long getCriteriaId() {
        return criteriaId;
    }

    public void setCriteriaId(Long criteriaId) {
        this.criteriaId = criteriaId;
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

    public boolean getCheckbox() {
        return checkbox;
    }

    public void setCheckbox(boolean checkbox) {
        this.checkbox = checkbox;
    }
}
