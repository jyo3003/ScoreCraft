package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.dto.StudentDTO;
import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import com.SER517.scorecraft_backend.service.GradingPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/gradingPage")
public class GradingPageController {

    @Autowired
    private GradingPageService gradingPageService;

    @GetMapping("/students")
    public ResponseEntity<List<StudentDTO>> getAllStudents() {
        List<StudentDTO> students = gradingPageService.getAllStudents();
        return ResponseEntity.ok().body(students);
    }

    @GetMapping("/criteria")
    public ResponseEntity<List<GradingCriteriaDTO>> getAllGradingCriteria() {
        List<GradingCriteriaDTO> criteria = gradingPageService.getAllGradingCriteria();
        return ResponseEntity.ok().body(criteria);
    }

    @PostMapping("/updateStudent")
    public ResponseEntity<StudentDTO> updateStudent(@RequestBody StudentDTO studentDTO) {
        return ResponseEntity.ok(gradingPageService.updateStudent(studentDTO));
    }

    @PostMapping("/updateGradingCriteria")
    public ResponseEntity<GradingCriteriaDTO> updateGradingCriteria(@RequestBody GradingCriteriaDTO gradingCriteriaDTO) {
        return ResponseEntity.ok(gradingPageService.updateGradingCriteria(gradingCriteriaDTO));
    }

    @DeleteMapping("/deleteStudent/{id}")
    public ResponseEntity<Void> deleteStudent(@PathVariable Long id) {
        gradingPageService.deleteStudent(id);
        return ResponseEntity.ok().build();
    }

    @DeleteMapping("/deleteGradingCriteria/{id}")
    public ResponseEntity<Void> deleteGradingCriteria(@PathVariable Long id) {
        gradingPageService.deleteGradingCriteria(id);
        return ResponseEntity.ok().build();
    }
}
