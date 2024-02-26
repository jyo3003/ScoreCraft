package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.service.GradingPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/gradingPage")
public class GradingPageController {

    @Autowired
    private GradingPageService gradingPageService;

    @GetMapping("/students")
    public ResponseEntity<List<Student>> getAllStudents() {
        List<Student> students = gradingPageService.getAllStudents();
        return ResponseEntity.ok().body(students);
    }

    @GetMapping("/criteria")
    public ResponseEntity<List<GradingCriteria>> getAllGradingCriteria() {
        List<GradingCriteria> criteria = gradingPageService.getAllGradingCriteria();
        return ResponseEntity.ok().body(criteria);
    }
    
    @PostMapping("/updateStudent")
    public ResponseEntity<Student> updateStudent(@RequestBody Student student) {
        return ResponseEntity.ok(gradingPageService.updateStudent(student));
    }

    @PostMapping("/updateGradingCriteria")
    public ResponseEntity<GradingCriteria> updateGradingCriteria(@RequestBody GradingCriteria gradingCriteria) {
        return ResponseEntity.ok(gradingPageService.updateGradingCriteria(gradingCriteria));
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
