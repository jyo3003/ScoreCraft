package com.SER517.scorecraft_backend.service;

import org.apache.poi.ss.usermodel.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.repository.GradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;

import java.io.*;
import java.util.*;

@Service
public class ExcelService {

	@Autowired
	private StudentRepository studentRepository;
	@Autowired
	private GradingRepository gradingRepository;

	public String processExcelFile(MultipartFile file) {
		try (Workbook workbook = WorkbookFactory.create(convertMultipartFileToFile(file))) {
			Sheet sheet = workbook.getSheetAt(0);
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
		return convFile;
	}

	private void parsingGradingCriteria(Sheet sheet) {
		Iterator<Row> rows = sheet.iterator();

		int gradingGroupNameCellIndex = 3; // 4th cell for grading group names, considering 0-based index

		// Process the first row for grading group names
		Row firstRow = sheet.getRow(0);
		Row secondRow = sheet.getRow(0);
		Row thirdRow = sheet.getRow(0);
		Row fourthRow = sheet.getRow(0);

		// To get index of where to start iterating inner loop later
		int lastIndex = 3;

		for (int cellIndex = 3; cellIndex < firstRow.getLastCellNum(); cellIndex += 2) { // Start from the 4th cell and
																							// skip every other cell

			Cell cell = firstRow.getCell(cellIndex);
			// Iterating group names of grading
			if (cell != null && cell.getCellType() != CellType.BLANK) {

				// iterating grading type, criteria and score under each group name
				for (int i = lastIndex; i < secondRow.getLastCellNum(); i++) {
					GradingCriteria gc = new GradingCriteria();
					Cell cell1 = secondRow.getCell(i);
					Cell cell2 = thirdRow.getCell(i);
					Cell cell3 = fourthRow.getCell(i);
					if (cell1 != null && cell1.getCellType() != CellType.BLANK) {

						// saving them in an object
						gc.setGradingCriteriaGroupName(cell.getStringCellValue());
						gc.setTypeOfCriteria(cell1.getStringCellValue());
						gc.setCriteriaName(cell2.getStringCellValue());
						gc.setScore(Integer.parseInt(cell3.getStringCellValue()));
						gradingRepository.save(gc);
					} else {
						i++;
						lastIndex = i;
						break;

					}
				}

			} else {
				break; // Exit if the main grading group name is empty
			}
		}

	}

	private void pasringStudentInfo(Sheet sheet) {
		// Process from row 4 onwards for student information
		for (int rowIndex = 3; rowIndex <= sheet.getLastRowNum(); rowIndex++) {
			Row row = sheet.getRow(rowIndex);
			Student student = new Student();
			String groupName = row.getCell(0).getStringCellValue();
			String asuriteId = row.getCell(1).getStringCellValue();
			String studentName = row.getCell(2).getStringCellValue();
			student.setAsurite(asuriteId);
			student.setGroupName(groupName);
			student.setStudentName(studentName);

			// saving student object
			studentRepository.save(student);

		}
	}
}
