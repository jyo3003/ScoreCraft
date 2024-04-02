package com.SER517.scorecraft_backend.service;

import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.StudentGrading;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.repository.StudentGradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;

import jakarta.transaction.Transactional;

import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeDTO;
import com.SER517.scorecraft_backend.dto.StudentWithGradesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
    

	@Transactional
    public void saveOrUpdateGradesForStudent(List<StudentGradeDTO> gradesDTO) {
        for (StudentGradeDTO dto : gradesDTO) {
            StudentGrading existingGrade = studentGradingRepository
                    .findByStudentIdAndGradingCriteriaId(dto.getStudentId(), dto.getCriteriaId())
                    .orElseGet(() -> new StudentGrading());

            if (existingGrade.getId() == null) {
            	
                // This is a new grade
                existingGrade.setStudent(studentRepository.findById(dto.getStudentId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid student ID: " + dto.getStudentId())));
                existingGrade.setGradingCriteria(gradingCriteriaRepository.findById(dto.getCriteriaId())
                        .orElseThrow(() -> new IllegalArgumentException("Invalid criteria ID: " + dto.getCriteriaId())));
            }
            
            existingGrade.setScore(dto.getScore());
            existingGrade.setComment(dto.getComment());

            studentGradingRepository.save(existingGrade);
                    
            // If the checkbox is true, set the same score and comment for all group members
            if (dto.getCheckbox()) {
                // Retrieve the group members of the student
                List<Student> groupMembers = studentRepository.findGroupMembersByStudentId(dto.getStudentId());
                
                // Set the same score and comment for each group member
                for (Student groupMember : groupMembers) {
                    StudentGrading existingGradeGrpMember = studentGradingRepository
                            .findByStudentIdAndGradingCriteriaId(groupMember.getId(), dto.getCriteriaId())
                            .orElseGet(() -> new StudentGrading());

                    if (existingGradeGrpMember.getId() == null) {
        
                        // This is a new grade for this group member
                        existingGradeGrpMember.setStudent(studentRepository.findById(groupMember.getId())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid student ID: " + groupMember.getId())));
                        existingGradeGrpMember.setGradingCriteria(gradingCriteriaRepository.findById(dto.getCriteriaId())
                                .orElseThrow(() -> new IllegalArgumentException("Invalid criteria ID: " + dto.getCriteriaId())));
                    }

                    existingGradeGrpMember.setScore(dto.getScore());
                    existingGradeGrpMember.setComment(dto.getComment());

                    studentGradingRepository.save(existingGradeGrpMember);
                }
            }
            
        }
    }


    public StudentWithGradesDTO getStudentWithGrades(Long studentId) {
		Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + studentId));

        List<StudentGrading> studentGradings = studentGradingRepository.findByStudentId(studentId);
        List<GradingCriteriaDTO> gradingCriteriaDTOs = new ArrayList<>();
        

        for (GradingCriteria gradingCriteria : gradingCriteriaRepository.findAll()) {
            // Find the grading record for the current criteria (if exists)
            StudentGrading grading = findGradingRecordForCriteria(studentGradings, gradingCriteria.getId());

            // Construct the DTO for the criteria
            GradingCriteriaDTO criterionDTO = new GradingCriteriaDTO(
            	gradingCriteria.getId(),
                gradingCriteria.getCriteriaName(),
                gradingCriteria.getScore(), // Static score associated with the criteria
                gradingCriteria.getTypeOfCriteria(),
                gradingCriteria.getGradingCriteriaGroupName(),
                (grading != null) ? grading.getScore() : -100.0, // Actual score achieved by the student (can be 0)
                (grading != null) ? grading.getComment() : "", // Comment for the student's score (nullable)
                gradingCriteria.getComments()
            );
            gradingCriteriaDTOs.add(criterionDTO);
        }

        return new StudentWithGradesDTO(
            student.getId(),
            student.getStudentName(),
            student.getAsurite(),
            gradingCriteriaDTOs
        );
	}
    
    
    
    private StudentGrading findGradingRecordForCriteria(List<StudentGrading> studentGradings, Long criteriaId) {
        for (StudentGrading grading : studentGradings) {
            if (grading.getGradingCriteria().getId().equals(criteriaId)) {
                return grading;
            }
        }
        return null; // No grading record found for the criteria
    }
    
    public boolean isStudentFullyGraded(Long studentId) {
        List<StudentGrading> studentGradings = studentGradingRepository.findByStudentId(studentId);
        List<GradingCriteria> allCriteria = gradingCriteriaRepository.findAll();

        for (GradingCriteria criterion : allCriteria) {
            StudentGrading grading = studentGradings.stream()
                    .filter(g -> g.getGradingCriteria().getId().equals(criterion.getId()))
                    .findFirst()
                    .orElse(null);

         // Check if the grading is missing, has a score of -100, or has an empty or null comment
            if (grading == null || grading.getScore() == -100.0 || grading.getComment() == null || grading.getComment().isEmpty()) {
                return false;
            }
        }

        return true;
    }


    public void addGradingCriteria(GradingCriteriaDTO gradingCriteriaDTO) {
        GradingCriteria gradingCriteria = new GradingCriteria();
        
        // Mapping DTO fields to GradingCriteria entity
        gradingCriteria.setId(gradingCriteriaDTO.getId());
        gradingCriteria.setCriteriaName(gradingCriteriaDTO.getCriteriaName());
        gradingCriteria.setScore(gradingCriteriaDTO.getCriteriaScore());
        gradingCriteria.setTypeOfCriteria(gradingCriteriaDTO.getTypeOfCriteria());
        gradingCriteria.setGradingCriteriaGroupName(gradingCriteriaDTO.getGradingCriteriaGroupName());
        gradingCriteria.setComments(gradingCriteriaDTO.getPredefinedComments());
        
        
        // Persist the new grading criteria into the database
        gradingCriteriaRepository.save(gradingCriteria);
    }

}
