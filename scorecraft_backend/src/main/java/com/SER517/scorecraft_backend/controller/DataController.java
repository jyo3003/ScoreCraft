package com.ser517.scorecraft_backend.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "http://localhost:3000/login") // Replace with your React frontend URL
@RestController
@RequestMapping("/api")
public class DataController {

    @GetMapping("/data")
    public String fetchData() {
        return "Hello from Spring Boot!";
    }
}

