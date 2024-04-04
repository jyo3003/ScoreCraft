package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.dto.GradingCriteriaDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeFreeComment;
import com.SER517.scorecraft_backend.dto.StudentWithGradesDTO;
import com.SER517.scorecraft_backend.service.GradingPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gradingPage")
public class GradingPageController {

    @Autowired
    private GradingPageService gradingPageService;

    
    @GetMapping("/studentGrades/{studentId}")
    public ResponseEntity<StudentWithGradesDTO> getStudentGrades(@PathVariable Long studentId) {
        try {
            StudentWithGradesDTO studentGrades = gradingPageService.getStudentWithGrades(studentId);
            return ResponseEntity.ok(studentGrades);
        } catch (Exception e) {
            return ResponseEntity.notFound().build();
        }
    }

   
    
    @PostMapping("/submitGrades")
    public ResponseEntity<String> submitGrades(@RequestBody StudentGradeFreeComment studentGradeFreeComment) {
    	System.out.println("Freeform Comment: " + studentGradeFreeComment.getFreeFormComment());
        gradingPageService.saveOrUpdateGradesForStudent(studentGradeFreeComment);
        return ResponseEntity.ok("Grades submitted successfully");
    }


    
    @PostMapping("/gradingCriteria")
    public ResponseEntity<String> addGradingCriteria(@RequestBody GradingCriteriaDTO gradingCriteriaDTO) {
        try {
            gradingPageService.addGradingCriteria(gradingCriteriaDTO);
            return ResponseEntity.ok("Criteria added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Error adding criteria");
        }
    }



   
}
