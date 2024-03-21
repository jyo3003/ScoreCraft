package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class StudentWithGradesDTO {
    

	private Long studentId;
    private String studentName;
    private double asuriteId;
    private List<GradingCriteriaDTO> gradingCriteria;

    // Constructor
    public StudentWithGradesDTO(Long studentId, String studentName, double d,
                                List<GradingCriteriaDTO> gradingCriteria) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.asuriteId = d;
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

	public List<GradingCriteriaDTO> getGradingCriteria() {
		return gradingCriteria;
	}

	public void setGradingCriteria(List<GradingCriteriaDTO> gradingCriteria) {
		this.gradingCriteria = gradingCriteria;
	}
}

