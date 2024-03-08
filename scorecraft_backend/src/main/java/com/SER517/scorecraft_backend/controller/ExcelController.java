package com.SER517.scorecraft_backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.SER517.scorecraft_backend.service.ExcelService;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/excel")
public class ExcelController {

    @Autowired
    private ExcelService excelService;

    @GetMapping("/test")
    public String getMethod(@RequestParam String param) {
        return new String("test " + param);
    }

    @PostMapping("/test2")
    public ResponseEntity<String> testPostMethod(@RequestBody String requestBody) {
        // Perform any necessary processing with the request body
        
        // For demonstration purposes, let's just return the received request body
        return ResponseEntity.status(HttpStatus.OK).body(requestBody);
    }
    
    @PutMapping("/upload")
    public ResponseEntity<String> uploadExcelFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please upload an Excel file.", HttpStatus.BAD_REQUEST);
        }

        excelService.processExcelFile(file);
        return new ResponseEntity<>("File data saved successfully.", HttpStatus.OK);
    }

    
}