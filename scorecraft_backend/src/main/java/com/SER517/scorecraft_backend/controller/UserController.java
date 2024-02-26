package com.SER517.scorecraft_backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.SER517.scorecraft_backend.model.User;
import com.SER517.scorecraft_backend.repository.UserRepository;

@RestController
public class UserController {

    @Autowired
    private AuthenticationManager authenticationManager;

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    // User registration
    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User newUser) {
        if (userRepository.existsByEmail(newUser.getUsername())) {
            return ResponseEntity
                    .badRequest()
                    .body("Error: Username is already taken!");
        }

        // Create new user's account
        User user = new User(newUser.getUsername(), 
                             passwordEncoder.encode(newUser.getPassword()), null, null);

        userRepository.save(user);

        return ResponseEntity.ok("User registered successfully!");
    }

    // User login
    @PostMapping("/login")
    public ResponseEntity<?> authenticateUser(@RequestBody LoginRequest loginRequest) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(loginRequest.getUsername(), loginRequest.getPassword()));

        SecurityContextHolder.getContext().setAuthentication(authentication);

        // You can add token generation and return it here if you're using JWT or similar
        
        return ResponseEntity.ok("User authenticated successfully");
    }

    static class LoginRequest {
        private String username;
        private String password;
        public Object getUsername() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getUsername'");
        }
        public Object getPassword() {
            // TODO Auto-generated method stub
            throw new UnsupportedOperationException("Unimplemented method 'getPassword'");
        }

        // Getters and Setters
    }
}
