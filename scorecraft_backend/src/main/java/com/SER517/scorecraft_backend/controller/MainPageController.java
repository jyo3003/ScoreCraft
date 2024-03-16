package com.SER517.scorecraft_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import com.SER517.scorecraft_backend.dto.GroupDTO;
import com.SER517.scorecraft_backend.dto.StudentDTO;
import com.SER517.scorecraft_backend.service.MainPageService;
import java.util.List;

/**
 * Controller for handling requests related to the main page of the application.
 */
@RestController
@RequestMapping("/api/main")
public class MainPageController {

    private final MainPageService mainPageService;

    @Autowired
    public MainPageController(MainPageService mainPageService) {
        this.mainPageService = mainPageService;
    }

    /**
     * Retrieves a list of all students.
     *
     * @return a list of {@link StudentDTO} objects representing all students.
     */
    @GetMapping("/students")
    public List<StudentDTO> getAllStudents() {
        return mainPageService.getAllStudents();
    }

    /**
     * Retrieves a list of all groups.
     *
     * @return a list of {@link GroupDTO} objects representing all groups.
     */
    @GetMapping("/groups")
    public List<GroupDTO> getAllGroups() {
        return mainPageService.getAllGroups();
    }

    // Future endpoints can be added here for additional functionalities
}
