package com.SER517.scorecraft_backend.service;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.SER517.scorecraft_backend.dto.GroupDTO;
import com.SER517.scorecraft_backend.dto.StudentDTO;
import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.repository.StudentRepository;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class MainPageService {

    @Autowired
    private StudentRepository studentRepository;
    
    @Autowired
    private GradingPageService gradingPageService; // Use GradingPageService to check grading status


    // Convert Student Entity to DTO
    private StudentDTO convertStudentToDTO(Student student) {
        boolean isFullyGraded = gradingPageService.isStudentFullyGraded(student.getId());
        return new StudentDTO(student.getId(), student.getAsurite(), student.getStudentName(), isFullyGraded, student.getGroupName());
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertStudentToDTO)
                .collect(Collectors.toList());
    }

    public List<GroupDTO> getAllGroups() {
        List<Student> students = studentRepository.findAll();
        Map<String, List<StudentDTO>> groupedStudents = students.stream()
                .map(this::convertStudentToDTO)
                .collect(Collectors.groupingBy(StudentDTO::getGroupName));

        return groupedStudents.entrySet().stream().map(entry -> {
            GroupDTO group = new GroupDTO(entry.getKey(), entry.getValue());
            group.setIsGraded(entry.getValue().stream().allMatch(StudentDTO::getGradingStatus));
            return group;
        }).collect(Collectors.toList());
    }

    // Add more methods for student and group operations as needed
}
