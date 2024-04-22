package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class StudentGradeFreeComment {
	
	private List<StudentGradeDTO> studentGrades;
	
	private String freeFormComment;
	

	public StudentGradeFreeComment(List<StudentGradeDTO> studentGrades, String freeFormComment) {
		super();
		this.studentGrades = studentGrades;
		this.freeFormComment = freeFormComment;
	}

	public List<StudentGradeDTO> getStudentGrades() {
		return studentGrades;
	}

	public void setStudentGrades(List<StudentGradeDTO> studentGrades) {
		this.studentGrades = studentGrades;
	}

	public String getFreeFormComment() {
		return freeFormComment;
	}

	public void setFreeFormComment(String freeFormComment) {
		this.freeFormComment = freeFormComment;
	}

}
