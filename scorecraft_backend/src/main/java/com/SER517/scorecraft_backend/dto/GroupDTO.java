package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class GroupDTO {
	
	private Long id; // Added id field

	private String groupName;

    private List<String> students;
    
    public GroupDTO() {
    	
    }
    
    public GroupDTO(Long id, String groupName, List<String> students) {
		super();
		this.id = id;
		this.groupName = groupName;
		this.students = students;
	}

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
	public List<String> getStudents() {
		return students;
	}
	public void setStudents(List<String> students) {
		this.students = students;
	}

}
