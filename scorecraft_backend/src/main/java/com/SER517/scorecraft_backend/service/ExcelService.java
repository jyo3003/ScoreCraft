package com.SER517.scorecraft_backend.service;

import org.apache.poi.ss.usermodel.*;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.repository.StudentGradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;
import java.io.*;
import java.util.*;

@Service
public class ExcelService {

	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private GradingCriteriaRepository gradingRepository;
	@Autowired
	private StudentGradingRepository studentGradingRepository;
	
	public boolean checkDataExists() {
        boolean studentsExist = studentRepository.count() > 0;
        boolean criteriaExist = gradingRepository.count() > 0;

        return studentsExist || criteriaExist;
    }

	private void clearExistingData() {
        // Truncate tables or delete data from repositories

        studentGradingRepository.deleteAllInBatch();
        gradingRepository.deleteAllInBatch();
        studentRepository.deleteAllInBatch();
    }
	
	public boolean getAssessmentType() {
	    // Logic to determine the assessment type based on existing data
		 // Check if group names exist in the Student table
        boolean groupNamesExist = studentRepository.existsByGroupNameNotNull();
		if (studentRepository.existsByGroupNameNullOrEmpty()) {
			groupNamesExist = false;
		}
		System.out.println(groupNamesExist);
        return groupNamesExist;
	}

	
	public String processExcelFile(MultipartFile file) {
		try (Workbook workbook = WorkbookFactory.create(convertMultipartFileToFile(file))) {
			Sheet sheet = workbook.getSheetAt(0);
			// Clear existing data
            clearExistingData();
			parsingGradingCriteria(sheet);
			pasringStudentInfo(sheet);
			return "File processed and data stored successfully";
		} catch (Exception e) {
			e.printStackTrace();
			return "Error processing file";
		}
	}

	private File convertMultipartFileToFile(MultipartFile file) throws IOException {
		File convFile = new File(System.getProperty("java.io.tmpdir") + "/" + file.getOriginalFilename());
		try (FileOutputStream fos = new FileOutputStream(convFile)) {
			fos.write(file.getBytes());
		}
		// Path destinationFile = rootLocation.resolve(
        //             Paths.get(file.getOriginalFilename()))
        //             .normalize().toAbsolutePath();
        //     Files.copy(file.getInputStream(), destinationFile);
		return convFile;
	}

	public void parsingGradingCriteria(Sheet sheet) {
	    int gradingGroupNameCellIndex = 3; // Start from 4th cell, considering 0-based index
	    int lastIndex = gradingGroupNameCellIndex;

	    // Process the first row for grading group names
	    Row firstRow = sheet.getRow(0);
	    if (firstRow == null) return; // Early exit if the row is not present

	    try {
	        for (int cellIndex = gradingGroupNameCellIndex; cellIndex < firstRow.getLastCellNum(); cellIndex += 2) {
	            Cell cell = firstRow.getCell(cellIndex);
	            // Check if the cell is not empty and proceed
	            if (cell != null && cell.getCellType() != CellType.BLANK) {
	                String groupName = cell.getStringCellValue();
	                // Parse grading criteria for the current group
	                lastIndex = parseGradingCriteriaForGroup(sheet, groupName, lastIndex);
	            }
	            // Skip to the next if the cell is empty
	        }
	    } catch (Exception e) {
	        // Log or handle the exception as appropriate
	        e.printStackTrace();
	    }
	}

	private int parseGradingCriteriaForGroup(Sheet sheet, String groupName, int startCellIndex) {
	    Row secondRow = sheet.getRow(1);
	    Row thirdRow = sheet.getRow(2);
	    Row fourthRow = sheet.getRow(3);
	    Row fifthRow = sheet.getRow(4);

	    if (secondRow == null || thirdRow == null || fourthRow == null || fifthRow == null) {
	        return startCellIndex; // Early exit if any row is not present
	    }

	    int lastIndex = startCellIndex;
	    for (int i = startCellIndex; i < secondRow.getLastCellNum(); i++) {
	        Cell typeCell = secondRow.getCell(i);
	        if (typeCell != null && typeCell.getCellType() != CellType.BLANK) {
	            GradingCriteria gc = new GradingCriteria();
	            try {
	                populateGradingCriteria(gc, groupName, secondRow, thirdRow, fourthRow, fifthRow, i);
	                gradingRepository.save(gc);
	            } catch (NumberFormatException e) {
	                // Handle parsing error, possibly log or notify about the issue
	                e.printStackTrace();
	            }
	        } else {
	            lastIndex = i + 1;
	            break; // Exit the loop if a blank cell is encountered, assuming consecutive data
	        }
	    }
	    return lastIndex; // Return the index to start from for the next group
	}

	private void populateGradingCriteria(GradingCriteria gc, String groupName, Row secondRow, Row thirdRow, Row fourthRow, Row fifthRow, int cellIndex) {
	    gc.setGradingCriteriaGroupName(groupName);
	    gc.setTypeOfCriteria(secondRow.getCell(cellIndex).getStringCellValue());
	    gc.setCriteriaName(thirdRow.getCell(cellIndex).getStringCellValue());

	    Cell scoreCell = fourthRow.getCell(cellIndex);
	    if (scoreCell != null && scoreCell.getCellType() == CellType.NUMERIC) {
	        gc.setScore((int) scoreCell.getNumericCellValue());
	    } else if (scoreCell != null && scoreCell.getCellType() == CellType.STRING) {
	        gc.setScore(Integer.parseInt(scoreCell.getStringCellValue())); // Assumes the cell contains a parsable integer
	    }

	    // Assuming comments are in fifth row and separated by ";"
	    Cell commentCell = fifthRow.getCell(cellIndex);
	    if (commentCell != null) {
	        String commentStr = commentCell.getStringCellValue();
	        List<String> comments = Arrays.asList(commentStr.split(";"));
	        gc.setComments(comments);
	    }
	}


	private void pasringStudentInfo(Sheet sheet) {
		// Process from row 4 onwards for student information
		for (int rowIndex = 6; rowIndex < sheet.getLastRowNum(); rowIndex++) {
			Row row = sheet.getRow(rowIndex);
			if (row.getCell(0) == null) {
                break;
            }
			Student student = new Student();
			String groupName = row.getCell(0).getStringCellValue();
			double asuriteId;
			if(row.getCell(1)!= null && row.getCell(1).getCellType()== CellType.NUMERIC){
				asuriteId = row.getCell(1).getNumericCellValue();
			}
			else{
                asuriteId = Double.parseDouble(row.getCell(1).getStringCellValue());
            }
			String studentName = row.getCell(2).getStringCellValue();
			student.setAsurite(asuriteId);
			student.setGroupName(groupName);
			student.setStudentName(studentName);
			// saving student object
			studentRepository.save(student);

		}
	}
}
