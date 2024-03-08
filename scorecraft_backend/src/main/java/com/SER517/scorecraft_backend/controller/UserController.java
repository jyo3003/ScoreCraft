package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.model.User;
import com.SER517.scorecraft_backend.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class UserController {

    @Autowired
    private UserService userService;

    // User registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (userService.existsByEmail(newUser.getEmail())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Email is already in use!");
        }

        userService.saveUser(newUser);

        return ResponseEntity.ok("User registered successfully!");
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody User loginRequest) {
        boolean isAuthenticated = userService.authenticateUser(loginRequest.getEmail(), loginRequest.getPassword());

        if (!isAuthenticated) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Authentication failed!");
        }

        return ResponseEntity.ok("User authenticated successfully");
    }
}