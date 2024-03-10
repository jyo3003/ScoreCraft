package com.SER517.scorecraft_backend.controller;

import com.SER517.scorecraft_backend.service.ExcelService;
import org.apache.poi.ss.usermodel.;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "", allowedHeaders = "")
@RestController
@RequestMapping("/api/excel")
public class ExcelController {

@Autowired
private ExcelService excelService;

}
