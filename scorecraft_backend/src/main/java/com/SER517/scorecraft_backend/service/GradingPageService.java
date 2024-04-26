package com.SER517.scorecraft_backend.service;

import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.StudentGrading;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.repository.StudentGradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;

import ch.qos.logback.core.boolex.Matcher;
import jakarta.transaction.Transactional;

import com.SER517.scorecraft_backend.dto.CriteriaDTO;
import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeFreeComment;
import com.SER517.scorecraft_backend.dto.StudentWithGradesDTO;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import javax.persistence.EntityNotFoundException;

import java.util.Map;
import java.util.Objects;
import java.util.regex.Pattern;

@Service
public class GradingPageService {

    @Autowired
    private GradingCriteriaRepository gradingCriteriaRepository;
    @Autowired
    private StudentGradingRepository studentGradingRepository;
    @Autowired
    private StudentRepository studentRepository;
    

    @Transactional
    public void saveOrUpdateGradesForStudent(StudentGradeFreeComment studentGradeFreeComment) {
    	List<StudentGradeDTO> gradesDTO = studentGradeFreeComment.getStudentGrades();
        String freeformComment = studentGradeFreeComment.getFreeFormComment();
        for (StudentGradeDTO dto : gradesDTO) {
            Student student = studentRepository.findById(dto.getStudentId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid student ID: " + dto.getStudentId()));

            // Check if a grading record already exists for the student and grading criteria
            StudentGrading existingGrade = studentGradingRepository
                    .findByStudentIdAndGradingCriteriaId(dto.getStudentId(), dto.getCriteriaId())
                    .orElseGet(() -> new StudentGrading());

            existingGrade.setStudent(student);
            existingGrade.setGradingCriteria(gradingCriteriaRepository.findById(dto.getCriteriaId())
                    .orElseThrow(() -> new IllegalArgumentException("Invalid criteria ID: " + dto.getCriteriaId())));
            existingGrade.setScore(dto.getScore());
            existingGrade.setComment(dto.getComment());
            if(dto.getCheckbox()!=null){
                existingGrade.setCheckbox(dto.getCheckbox());
            }
            else{
                existingGrade.setCheckbox(null);
            }
            studentGradingRepository.save(existingGrade);
            // Update or set freeform comment for the student
            student.setFreeformComment(freeformComment);
            studentRepository.save(student);

            // If the checkbox is true, set the same score and comment for all group members
            if (dto.getCheckbox() != null && dto.getCheckbox()) {
                // Retrieve the group members of the student
                List<Student> groupMembers = studentRepository.findGroupMembersByStudentId(dto.getStudentId());

                // Set the same score and comment for each group member
                for (Student groupMember : groupMembers) {
                    StudentGrading existingGradeGrpMember = studentGradingRepository
                            .findByStudentIdAndGradingCriteriaId(groupMember.getId(), dto.getCriteriaId())
                            .orElseGet(() -> new StudentGrading());

                    existingGradeGrpMember.setStudent(groupMember);
                    existingGradeGrpMember.setGradingCriteria(gradingCriteriaRepository.findById(dto.getCriteriaId())
                            .orElseThrow(() -> new IllegalArgumentException("Invalid criteria ID: " + dto.getCriteriaId())));
                    existingGradeGrpMember.setScore(dto.getScore());
                    existingGradeGrpMember.setComment(dto.getComment());
                    existingGradeGrpMember.setCheckbox(dto.getCheckbox());

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
                (grading != null) ? grading.getCheckbox() : null,
                gradingCriteria.getComments()
            );
            gradingCriteriaDTOs.add(criterionDTO);
        }

        System.out.println(student.getFreeformComment());

        return new StudentWithGradesDTO(
            student.getId(),
            student.getStudentName(),
            student.getAsurite(),
            student.getFreeformComment(),
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


    public void addGradingCriteria(CriteriaDTO gradingCriteriaDTO) {
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

    @Transactional
    public void updateGradingCriteria(Long criteriaId, CriteriaDTO updatedCriteriaDTO) {
        // Fetch the grading criteria from the repository
        GradingCriteria gradingCriteria = gradingCriteriaRepository.findById(criteriaId)
                .orElseThrow(() -> new EntityNotFoundException("Grading criteria not found with ID: " + criteriaId));

        // Update comments for already graded students
        List<StudentGrading> gradedStudents = studentGradingRepository.findByGradingCriteriaId(criteriaId);
        for (StudentGrading studentGrading : gradedStudents) {
            // Get the index of the old comment associated with the student grading
            int commentIndex = gradingCriteria.getComments().indexOf(studentGrading.getComment());
            if (commentIndex != -1) {
                if(commentIndex >= updatedCriteriaDTO.getPredefinedComments().size()){
                    studentGrading.setComment("");
                    studentGrading.setScore(-100);
                }
                else{
                    // Update the comment to the equivalent comment in the new list
                    String newComment = updatedCriteriaDTO.getPredefinedComments().get(commentIndex);

                    // Use regular expression to extract the score enclosed within parentheses
                    Pattern pattern = Pattern.compile("\\((\\d+(\\.\\d+)?)\\)$");
                    java.util.regex.Matcher matcher = pattern.matcher(newComment);

                    // Check if the pattern matches
                    if (matcher.find()) {
                        // Extract the score from the matched group
                        String scoreString = matcher.group(1);
                        try {
                            double newScore = Double.parseDouble(scoreString);
                            studentGrading.setScore(newScore);
                        } catch (NumberFormatException e) {
                            // If parsing fails, log an error or handle it accordingly
                            System.err.println("Invalid score format: " + scoreString);
                        }
                    } else {
                        // If the pattern does not match, log an error or handle it accordingly
                        System.err.println("Score not found in comment: " + newComment);
                    }

                    // Set the new comment
                    studentGrading.setComment(newComment);
                }
            }
        }
        // Save the updated comments for already graded students
        studentGradingRepository.saveAll(gradedStudents);

        // Update the grading criteria with the data from the DTO
        gradingCriteria.setCriteriaName(updatedCriteriaDTO.getCriteriaName());
        gradingCriteria.setScore(updatedCriteriaDTO.getCriteriaScore());
        gradingCriteria.setTypeOfCriteria(updatedCriteriaDTO.getTypeOfCriteria());
        gradingCriteria.setGradingCriteriaGroupName(updatedCriteriaDTO.getGradingCriteriaGroupName());
        gradingCriteria.setComments(updatedCriteriaDTO.getPredefinedComments());

        // Check if the type of criteria is changed to "I"
        if ("I".equals(updatedCriteriaDTO.getTypeOfCriteria())) {
            // Update checkbox value to null for all entries in StudentGrading table with this criteria ID
            List<StudentGrading> studentGradings = studentGradingRepository.findByGradingCriteriaId(criteriaId);
            for (StudentGrading studentGrading : studentGradings) {
                studentGrading.setCheckbox(null);
            }
            // Save the updated StudentGrading entities
            studentGradingRepository.saveAll(studentGradings);
        }

        // Save the updated grading criteria back to the repository
        gradingCriteriaRepository.save(gradingCriteria);


    }

    @Transactional
    public void deleteGradingCriteria(Long criteriaId) {
        // Delete all records in StudentGrading table with the given criteriaId
        studentGradingRepository.deleteByGradingCriteriaId(criteriaId);
    
        // Check if the grading criteria exists
        GradingCriteria gradingCriteria = gradingCriteriaRepository.findById(criteriaId)
                .orElseThrow(() -> new EntityNotFoundException("Grading criteria not found with ID: " + criteriaId));
    
        // Delete the grading criteria
        gradingCriteriaRepository.delete(gradingCriteria);
    }

}
