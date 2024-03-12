package com.SER517.scorecraft_backend.dto;

import java.util.List;

public class GradingMainDTO {
	
	private String gradingCriteriaGroupName;
	

	private List<GradingCriteriaDTO> gradingCriteria;
	
	public GradingMainDTO() {
		
	}
	
	public GradingMainDTO(String gradingCriteriaGroupName, List<GradingCriteriaDTO> gradingCriteria) {
		super();
		this.gradingCriteriaGroupName = gradingCriteriaGroupName;
		this.gradingCriteria = gradingCriteria;
	}
	
	public String getGradingCriteriaGroupName() {
		return gradingCriteriaGroupName;
	}

	public void setGradingCriteriaGroupName(String gradingCriteriaGroupName) {
		this.gradingCriteriaGroupName = gradingCriteriaGroupName;
	}

	public List<GradingCriteriaDTO> getGradingCriteria() {
		return gradingCriteria;
	}

	public void setGradingCriteria(List<GradingCriteriaDTO> gradingCriteria) {
		this.gradingCriteria = gradingCriteria;
	}

	

}
