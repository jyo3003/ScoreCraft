package com.SER517.scorecraft_backend.service;

import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.repository.StudentRepository;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.dto.StudentDTO;
import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GradingPageService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GradingCriteriaRepository gradingCriteriaRepository;

    // Retrieve all students and convert them to DTOs
    public List<StudentDTO> getAllStudents() {
        List<Student> students = studentRepository.findAll();
        return students.stream()
                .map(this::convertToStudentDTO)
                .collect(Collectors.toList());
    }

    // Retrieve all grading criteria and convert them to DTOs
    public List<GradingCriteriaDTO> getAllGradingCriteria() {
        List<GradingCriteria> criteriaList = gradingCriteriaRepository.findAll();
        return criteriaList.stream()
                .map(this::convertToGradingCriteriaDTO)
                .collect(Collectors.toList());
    }

    // Update a student and return the updated student as DTO
    public StudentDTO updateStudent(StudentDTO studentDTO) {
        Student student = convertToStudentEntity(studentDTO);
        Student updatedStudent = studentRepository.save(student);
        return convertToStudentDTO(updatedStudent);
    }

    // Update grading criteria and return the updated criteria as DTO
    public GradingCriteriaDTO updateGradingCriteria(GradingCriteriaDTO gradingCriteriaDTO) {
        GradingCriteria gradingCriteria = convertToGradingCriteriaEntity(gradingCriteriaDTO);
        GradingCriteria updatedGradingCriteria = gradingCriteriaRepository.save(gradingCriteria);
        return convertToGradingCriteriaDTO(updatedGradingCriteria);
    }

    // Delete a student by ID
    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    // Delete grading criteria by ID
    public void deleteGradingCriteria(Long id) {
        gradingCriteriaRepository.deleteById(id);
    }

 // Conversion methods

 // Convert Student entity to StudentDTO
 private StudentDTO convertToStudentDTO(Student student) {
     return new StudentDTO(
             student.getId(),
             student.getAsurite(),
             student.getStudentName(),
            student.getGradingStatus()
     );
 }

 // Convert StudentDTO to Student entity
 private Student convertToStudentEntity(StudentDTO studentDTO) {
     Student student = new Student();
     student.setId(studentDTO.getId());
     student.setAsurite(studentDTO.getAsurite());
     student.setStudentName(studentDTO.getStudentName());
     return student;
 }

 // Convert GradingCriteria entity to GradingCriteriaDTO
 private GradingCriteriaDTO convertToGradingCriteriaDTO(GradingCriteria gradingCriteria) {
     return new GradingCriteriaDTO(
             gradingCriteria.getId(),
             gradingCriteria.getCriteriaName(),
             gradingCriteria.getScore(),
             gradingCriteria.getTypeOfCriteria(),
             gradingCriteria.getGradingCriteriaGroupName()
     );
 }

 // Convert GradingCriteriaDTO to GradingCriteria entity
 private GradingCriteria convertToGradingCriteriaEntity(GradingCriteriaDTO gradingCriteriaDTO) {
     GradingCriteria gradingCriteria = new GradingCriteria();
     gradingCriteria.setId(gradingCriteriaDTO.getId());
     gradingCriteria.setCriteriaName(gradingCriteriaDTO.getCriteriaName());
     gradingCriteria.setScore(gradingCriteriaDTO.getScore());
     gradingCriteria.setTypeOfCriteria(gradingCriteriaDTO.getTypeOfCriteria());
     gradingCriteria.setGradingCriteriaGroupName(gradingCriteriaDTO.getGradingCriteriaGroupName());
     return gradingCriteria;
 }

}
