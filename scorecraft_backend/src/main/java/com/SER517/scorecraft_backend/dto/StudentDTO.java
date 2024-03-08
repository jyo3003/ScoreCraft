package com.SER517.scorecraft_backend.dto;

public class StudentDTO {

    private Long id; // Added id field
    private double asurite;
    private String studentName;
    private String gradingStatus;

    // Constructors

    public String getGradingStatus() {
        return gradingStatus;
    }

    public void setGradingStatus(String gradingStatus) {
        this.gradingStatus = gradingStatus;
    }

    public StudentDTO() {
    }

    public StudentDTO(Long id, String groupName, double asurite, String finalComment, double d, String studentName) {
        this.id = id;
        this.asurite = asurite;
        this.studentName = studentName;
    }

    // Getters and Setters

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public double getAsurite() {
        return asurite;
    }

    public void setAsurite(double asurite) {
        this.asurite = asurite;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
