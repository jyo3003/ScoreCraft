package com.SER517.scorecraft_backend.dto;

public class StudentDTO {

    private Long id; // Added id field
    private double asurite;
    private String studentName;
    private boolean gradingStatus;
    private String groupName;

    // Constructors

    public StudentDTO(Long id, double asurite, String studentName, boolean gradingStatus, String groupName) {
        this.id = id;
        this.asurite = asurite;
        this.studentName = studentName;
        this.gradingStatus = gradingStatus;
        this.groupName = groupName;
    }

    // Getters and Setters

    public String getGroupName() {
        return groupName;
    }

    public void setGroupName(String groupName) {
        this.groupName = groupName;
    }

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
    public boolean getGradingStatus() {
        return gradingStatus;
    }

    public void setGradingStatus(boolean gradingStatus) {
        this.gradingStatus = gradingStatus;
    }
}
