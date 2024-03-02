package com.SER517.scorecraft_backend.dto;

public class StudentDTO {

    private Long id; // Added id field

    private String groupName;
    private String asurite;
    private String finalComment;
    private int finalScore;
    private String studentName;

    // Constructors

    public StudentDTO() {
    }

    public StudentDTO(Long id, String groupName, String asurite, String finalComment, int finalScore, String studentName) {
        this.id = id;
        this.groupName = groupName;
        this.asurite = asurite;
        this.finalComment = finalComment;
        this.finalScore = finalScore;
        this.studentName = studentName;
    }

    // Getters and Setters

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

    public String getFinalComment() {
        return finalComment;
    }

    public void setFinalComment(String finalComment) {
        this.finalComment = finalComment;
    }

    public int getFinalScore() {
        return finalScore;
    }

    public void setFinalScore(int finalScore) {
        this.finalScore = finalScore;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }
}
