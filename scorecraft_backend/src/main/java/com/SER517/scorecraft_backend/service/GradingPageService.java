package com.SER517.scorecraft_backend.service;

import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.model.StudentGrading;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.repository.StudentGradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;
import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import com.SER517.scorecraft_backend.dto.GradingMainDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import java.util.Map;

@Service
public class GradingPageService {

    @Autowired
    private GradingCriteriaRepository gradingCriteriaRepository;
    @Autowired
    private StudentGradingRepository studentGradingRepository;
    @Autowired
    private StudentRepository studentRepository;
    
    

    // Create or Update Grading Criteria based on GradingMainDTO
    public List<GradingCriteriaDTO> saveGradingCriteria(GradingMainDTO gradingMainDTO) {
        List<GradingCriteria> entities = gradingMainDTO.getGradingCriteria().stream()
                .map(this::convertToGradingCriteriaEntity)
                .collect(Collectors.toList());

        List<GradingCriteria> savedEntities = gradingCriteriaRepository.saveAll(entities);
        return savedEntities.stream().map(this::convertToGradingCriteriaDTO).collect(Collectors.toList());
    }

    // Fetch all GradingMainDTO
    public List<GradingMainDTO> getAllGradingGroups() {
        List<GradingCriteria> criteriaList = gradingCriteriaRepository.findAll();
        Map<String, List<GradingCriteriaDTO>> groupedCriteria = criteriaList.stream()
                .map(this::convertToGradingCriteriaDTO)
                .collect(Collectors.groupingBy(GradingCriteriaDTO::getGradingCriteriaGroupName));

        return groupedCriteria.entrySet().stream()
                .map(entry -> new GradingMainDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // Delete Grading Criteria by Group Name
    public void deleteGradingCriteriaByGroupName(String groupName) {
        List<GradingCriteria> criteriaList = gradingCriteriaRepository.findAll();
        List<GradingCriteria> filteredCriteria = criteriaList.stream()
                .filter(c -> groupName.equals(c.getGradingCriteriaGroupName()))
                .collect(Collectors.toList());

        gradingCriteriaRepository.deleteAll(filteredCriteria);
    }

    // Utility methods for conversion
    private GradingCriteriaDTO convertToGradingCriteriaDTO(GradingCriteria gradingCriteria) {
        return new GradingCriteriaDTO(
            gradingCriteria.getId(),
            gradingCriteria.getCriteriaName(),
            gradingCriteria.getScore(),
            gradingCriteria.getGradedScore(),
            gradingCriteria.getTypeOfCriteria(),
            gradingCriteria.getGradingCriteriaGroupName(),
            gradingCriteria.getComment()
        );
    }


    private GradingCriteria convertToGradingCriteriaEntity(GradingCriteriaDTO gradingCriteriaDTO) {
        GradingCriteria gradingCriteria = new GradingCriteria();
        gradingCriteria.setId(gradingCriteriaDTO.getId()); // Be cautious with setting ID for creation
        gradingCriteria.setCriteriaName(gradingCriteriaDTO.getCriteriaName());
        gradingCriteria.setScore(gradingCriteriaDTO.getScore());
        gradingCriteria.setGradedScore(gradingCriteriaDTO.getGradedScore());
        gradingCriteria.setTypeOfCriteria(gradingCriteriaDTO.getTypeOfCriteria());
        gradingCriteria.setGradingCriteriaGroupName(gradingCriteriaDTO.getGradingCriteriaGroupName());
        gradingCriteria.setComment(gradingCriteriaDTO.getComment());
        return gradingCriteria;
    }

    //To save any new score, comment fields
    public void addNewFields(GradingMainDTO gradingMainDTO) {
        List<GradingCriteria> newGradingCriteriaList = gradingMainDTO.getGradingCriteria().stream()
                .map(this::convertToGradingCriteriaEntity)
                .collect(Collectors.toList());
        
     // Set the gradingCriteriaGroupName for each entity
        newGradingCriteriaList.forEach(entity -> entity.setGradingCriteriaGroupName(gradingMainDTO.getGradingCriteriaGroupName()));


        gradingCriteriaRepository.saveAll(newGradingCriteriaList);
    }

	public void saveStudentGrades(List<StudentGradeDTO> studentGrades) {
		// TODO Auto-generated method stub
		List<StudentGrading> studentGradings = studentGrades.stream().map(dto -> {
	        StudentGrading sg = new StudentGrading();
	        sg.setStudent(studentRepository.findById(dto.getStudentId()).orElseThrow(() -> new EntityNotFoundException("Student not found")));
	        sg.setGradingCriteria(gradingCriteriaRepository.findById(dto.getCriteriaId()).orElseThrow(() -> new EntityNotFoundException("Grading Criteria not found")));
	        sg.setScore(dto.getScore());
	        sg.setComment(dto.getComment());
	        return sg;
	    }).collect(Collectors.toList());

	    studentGradingRepository.saveAll(studentGradings);
		
	}

}
