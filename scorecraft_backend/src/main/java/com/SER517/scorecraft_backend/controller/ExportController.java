package com.SER517.scorecraft_backend.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.SER517.scorecraft_backend.service.ExportService;

@RestController
@RequestMapping("/api/export")
public class ExportController {

    private final ExportService exportService;

    @Autowired
    public ExportController(ExportService exportService) {
        this.exportService = exportService;
    }

    @GetMapping("/excel")
    public ResponseEntity<byte[]> exportExcelReports() throws IOException {
        byte[] zipBytes = exportService.generateExcelReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_OCTET_STREAM);
        headers.setContentDispositionFormData("attachment", "excel_reports.zip");

        return new ResponseEntity<>(zipBytes, headers, HttpStatus.OK);
    }
    
    @GetMapping("/excel2")
    public ResponseEntity<byte[]> exportToExcel2() {
        byte[] bytes = exportService.generateDetailedExcelReport();

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(new MediaType("application", "force-download"));
        headers.setContentDispositionFormData("attachment", "export2.xlsx");

        return new ResponseEntity<>(bytes, headers, HttpStatus.OK);
    }
}

