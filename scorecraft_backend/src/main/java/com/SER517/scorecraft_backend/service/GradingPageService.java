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
            
        }
    }


    public StudentWithGradesDTO getStudentWithGrades(Long studentId) {
		Student student = studentRepository.findById(studentId)
            .orElseThrow(() -> new EntityNotFoundException("Student not found with ID: " + studentId));

        List<StudentGrading> studentGradings = studentGradingRepository.findByStudentId(studentId);
        System.out.println(studentGradings);
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
                (grading != null) ? grading.getScore() : 0.0, // Actual score achieved by the student (can be 0)
                (grading != null) ? grading.getComment() : null // Comment for the student's score (nullable)
            );
            
            System.out.println(criterionDTO);
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

}
