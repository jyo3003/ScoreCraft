package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class GroupDTO {

	private String groupName;

    private List<StudentDTO> students;
    
    private boolean isGraded; // Add this line

    
    public GroupDTO(String groupName, List<StudentDTO> students) {
		super();
		this.groupName = groupName;
		this.students = students;
	}
	public String getGroupName() {
		return groupName;
	}
	public void setGroupName(String groupName) {
		this.groupName = groupName;
	}
	public List<StudentDTO> getStudents() {
		return students;
	}
	public void setStudents(List<StudentDTO> students) {
		this.students = students;
	}
	
    public boolean getIsGraded() {
        return isGraded;
    }

    public void setIsGraded(boolean isGraded) {
        this.isGraded = isGraded;
    }

}
