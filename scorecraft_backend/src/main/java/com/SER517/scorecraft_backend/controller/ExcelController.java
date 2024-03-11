package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.service.ExcelService;
import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;


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

    // @PostMapping("/upload")
    // public ResponseEntity<List<Map<String, String>>> uploadExcel(@RequestParam("file") MultipartFile file) {
    //     if (file.isEmpty()) {
    //         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null);
    //     }
    //     List<Map<String, String>> dataList = new ArrayList<>();
    //     try {
    //         Workbook workbook = WorkbookFactory.create(file.getInputStream());
    //         Sheet sheet = workbook.getSheetAt(0);
    //         Row headerRow = sheet.getRow(0);
    //         for (int i = 1; i <= sheet.getLastRowNum(); i++) {
    //             Row row = sheet.getRow(i);
    //             Map<String, String> dataMap = new HashMap<>();
    //             int cellIndex = 0;
    //             for (Cell cell : row) {
    //                 dataMap.put(headerRow.getCell(cellIndex).toString(), cell.toString());
    //                 cellIndex++;
    //             }
    //             dataList.add(dataMap);
    //         }
    //         workbook.close();
    //     } catch (IOException e) {
    //         return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(null);
    //     }
    //     return ResponseEntity.ok(dataList);
    // }
}
