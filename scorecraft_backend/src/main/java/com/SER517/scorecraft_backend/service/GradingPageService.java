package com.SER517.scorecraft_backend.service;

import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.repository.StudentRepository;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradingPageService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private GradingCriteriaRepository gradingCriteriaRepository;

    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }

    public List<GradingCriteria> getAllGradingCriteria() {
        return gradingCriteriaRepository.findAll();
    }
    
    public Student updateStudent(Student student) {
        return studentRepository.save(student);
    }

    public GradingCriteria updateGradingCriteria(GradingCriteria gradingCriteria) {
        return gradingCriteriaRepository.save(gradingCriteria);
    }

    public void deleteStudent(Long id) {
        studentRepository.deleteById(id);
    }

    public void deleteGradingCriteria(Long id) {
        gradingCriteriaRepository.deleteById(id);
    }
}
