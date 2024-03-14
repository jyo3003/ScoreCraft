package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.service.ExcelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;


@CrossOrigin(origins = "*", allowedHeaders = "*")
@RestController
@RequestMapping("/api/excel")
public class ExcelController {
    @Autowired
    private ExcelService excelService;
    

    @PutMapping("/upload")
    public ResponseEntity<String> uploadExcelFile(@RequestParam("file") MultipartFile file) throws IOException {
        if (file.isEmpty()) {
            return new ResponseEntity<>("Please upload an Excel file.", HttpStatus.BAD_REQUEST);
        }
        excelService.processExcelFile(file);
        return new ResponseEntity<>("File data saved successfully.", HttpStatus.OK);
    }

    
}
