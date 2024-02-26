package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.service.GradingCriteriaService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/grading-criteria")
public class GradingCriteriaController {

    @Autowired
    private GradingCriteriaService gradingCriteriaService;

    @PostMapping
    public GradingCriteria createGradingCriteria(@RequestBody GradingCriteria gradingCriteria) {
        return gradingCriteriaService.save(gradingCriteria);
    }

    @GetMapping
    public List<GradingCriteria> getAllGradingCriteria() {
        return gradingCriteriaService.findAll();
    }


}

