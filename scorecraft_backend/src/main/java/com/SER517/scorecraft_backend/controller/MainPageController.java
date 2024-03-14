package com.SER517.scorecraft_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SER517.scorecraft_backend.dto.GroupDTO;
import com.SER517.scorecraft_backend.dto.StudentDTO;
import com.SER517.scorecraft_backend.service.MainPageService;

import java.util.List;


@RestController
@RequestMapping("/api/main")
public class MainPageController {

    @Autowired
    private MainPageService mainPageService;

    @GetMapping("/students")
    public List<StudentDTO> getAllStudents() {
        return mainPageService.getAllStudents();
    }

    @GetMapping("/groups")
    public List<GroupDTO> getAllGroups() {
        return mainPageService.getAllGroups();
    }

    // Add more endpoints as needed for additional functionalities
}