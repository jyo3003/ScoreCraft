package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.dto.GradingMainDTO;
import com.SER517.scorecraft_backend.dto.StudentGradeDTO;
import com.SER517.scorecraft_backend.service.GradingPageService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;

import java.util.List;

@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/gradingPage")
public class GradingPageController {

    @Autowired
    private GradingPageService gradingPageService;

    // Endpoint to get all grading groups with their criteria
    @GetMapping("/allGradingGroups")
    public ResponseEntity<List<GradingMainDTO>> getAllGradingGroups() {
        List<GradingMainDTO> gradingGroups = gradingPageService.getAllGradingGroups();
        return ResponseEntity.ok().body(gradingGroups);
    }
    
    @PostMapping("/submitGrades")
    public ResponseEntity<String> submitGrades(@RequestBody List<StudentGradeDTO> studentGrades) {
        gradingPageService.saveOrUpdateGradesForStudent(studentGrades);
        return ResponseEntity.ok("Grades submitted successfully");
    }


    // Endpoint to create or update a whole group of grading criteria and return it
    @PostMapping("/saveGradingGroup")
    public ResponseEntity<List<GradingMainDTO>> saveGradingGroup(@RequestBody GradingMainDTO gradingMainDTO) {
        gradingPageService.saveGradingCriteria(gradingMainDTO);
        // After saving, fetch and return the updated list of all grading groups
        List<GradingMainDTO> updatedGradingGroups = gradingPageService.getAllGradingGroups();
        return ResponseEntity.ok().body(updatedGradingGroups);
    }

    // Endpoint to delete all grading criteria by their group names
    @DeleteMapping("/deleteGradingGroup/{groupName}")
    public ResponseEntity<Void> deleteGradingGroup(@PathVariable String groupName) {
        gradingPageService.deleteGradingCriteriaByGroupName(groupName);
        return ResponseEntity.ok().build();
    }
}
