package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class StudentWithGradesDTO {
    

	private Long studentId;
    private String studentName;
    private double asuriteId;
	private String freeFormComment;
	private List<GradingCriteriaDTO> gradingCriteria;

    // Constructor
    public StudentWithGradesDTO(Long studentId, String studentName, double d, String freeFormComment,
                                List<GradingCriteriaDTO> gradingCriteria) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.asuriteId = d;
		this.freeFormComment = freeFormComment;
        this.gradingCriteria = gradingCriteria;
    }

    // Getters and Setters
    public Long getStudentId() {
		return studentId;
	}

	public void setStudentId(Long studentId) {
		this.studentId = studentId;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public double getAsuriteId() {
		return asuriteId;
	}

	public void setAsuriteId(double asuriteId) {
		this.asuriteId = asuriteId;
	}
	public String getFreeFormComment() {
		return freeFormComment;
	}

	public void setFreeFormComment(String freeFormComment) {
		this.freeFormComment = freeFormComment;
	}

	public List<GradingCriteriaDTO> getGradingCriteria() {
		return gradingCriteria;
	}

	public void setGradingCriteria(List<GradingCriteriaDTO> gradingCriteria) {
		this.gradingCriteria = gradingCriteria;
	}
}

