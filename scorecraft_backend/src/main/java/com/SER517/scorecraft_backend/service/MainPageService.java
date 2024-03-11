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

    // Convert Student Entity to DTO
    private StudentDTO convertStudentToDTO(Student student) {
        return new StudentDTO(student.getId(), student.getAsurite(), student.getStudentName(), student.getGradingStatus(), student.getGroupName());
    }

    public List<StudentDTO> getAllStudents() {
        return studentRepository.findAll().stream()
                .map(this::convertStudentToDTO)
                .collect(Collectors.toList());
    }

    public List<GroupDTO> getAllGroups() {
        // Fetch all students
        List<Student> students = studentRepository.findAll();

        // Group students by groupName
        Map<String, List<StudentDTO>> groups = students.stream()
                .map(this::convertStudentToDTO)
                .collect(Collectors.groupingBy(StudentDTO::getGroupName));

        // Convert groups map to list of GroupDTO
        return groups.entrySet().stream()
                .map(entry -> new GroupDTO(entry.getKey(), entry.getValue()))
                .collect(Collectors.toList());
    }

    // Add more methods for student and group operations as needed
}
