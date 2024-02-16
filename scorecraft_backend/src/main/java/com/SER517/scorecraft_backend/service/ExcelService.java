package com.ser517.scorecraft_backend.service;

import java.io.File;
import java.io.IOException;

import org.apache.poi.EncryptedDocumentException;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.ss.usermodel.WorkbookFactory;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelService {

	public void processExcelFile(MultipartFile file) {
		// Your logic to process the Excel file goes here
		// For example, you can read the data from the Excel file and store it in the
		// database
		// Here is a simple example of how you might read the data from the file:
		try {
			// Convert the MultipartFile to a File object
			File excelFile = convertMultipartFileToFile(file);

			// Use a library like Apache POI to read data from the Excel file
			Workbook workbook = WorkbookFactory.create(excelFile);

			// Assuming the first sheet contains the data
			Sheet sheet = workbook.getSheetAt(0);

			// Iterate through rows and columns to read data
			for (Row row : sheet) {
				for (Cell cell : row) {
					// Process cell data as needed
					String cellValue = cell.getStringCellValue();
					// Example: Insert cellValue into database
				}
			}

			// Close workbook and delete temporary file
			workbook.close();
			excelFile.delete();
		} catch (IOException | EncryptedDocumentException e) {
			// Handle exceptions appropriately
			e.printStackTrace();
		}
	}

	private File convertMultipartFileToFile(MultipartFile file) throws IOException {
		File convFile = new File(file.getOriginalFilename());
		file.transferTo(convFile);
		return convFile;
	}
}
