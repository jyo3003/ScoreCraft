package com.SER517.scorecraft_backend.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.ss.util.CellRangeAddress;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.model.Student;
import com.SER517.scorecraft_backend.model.StudentGrading;
import com.SER517.scorecraft_backend.repository.GradingCriteriaRepository;
import com.SER517.scorecraft_backend.repository.StudentGradingRepository;
import com.SER517.scorecraft_backend.repository.StudentRepository;

import java.io.ByteArrayOutputStream;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
public class ExportService {

    @Autowired
    private StudentRepository studentRepository;

    @Autowired
    private StudentGradingRepository studentGradingRepository;

    @Autowired
    private GradingCriteriaRepository gradingCriteriaRepository;

    public byte[] generateExcelReport() {
        try (Workbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            Sheet sheet = workbook.createSheet("Student Grades");

            // Header row
            String[] columns = {"Student Name", "ASURite ID", "Final Score", "Comments"};
            Row headerRow = sheet.createRow(0);
            for (int i = 0; i < columns.length; i++) {
                Cell cell = headerRow.createCell(i);
                cell.setCellValue(columns[i]);
            }

            List<Student> students = studentRepository.findAll();
            int rowNum = 1;
            for (Student student : students) {
                List<StudentGrading> gradings = studentGradingRepository.findByStudentId(student.getId());

                double totalScore = calculateAndSaveFinalScore(student, gradings);
                String finalComments = calculateAndSaveFinalComments(student, gradings);

                // Populate Excel rows with student data
                Row row = sheet.createRow(rowNum++);
                row.createCell(0).setCellValue(student.getStudentName());
                row.createCell(1).setCellValue(student.getAsurite());
                row.createCell(2).setCellValue(totalScore);
                row.createCell(3).setCellValue(finalComments);
            }

            // Auto-size columns
            for (int i = 0; i < columns.length; i++) {
                sheet.autoSizeColumn(i);
            }

            // Write the workbook to output stream
            workbook.write(out);
            return out.toByteArray();
        } catch (Exception e) {
            throw new RuntimeException("Error in generating Excel report", e);
        }
    }

    private double calculateAndSaveFinalScore(Student student, List<StudentGrading> gradings) {
        double totalScore = gradings.stream().mapToDouble(StudentGrading::getScore).sum();
        student.setFinalscore(totalScore); // Set final score
        studentRepository.save(student); // Save the student record with updated final score
        return totalScore;
    }

    private String calculateAndSaveFinalComments(Student student, List<StudentGrading> gradings) {
        StringBuilder comments = new StringBuilder();
        for (StudentGrading grading : gradings) {
            String criteriaName = grading.getGradingCriteria().getCriteriaName();
            double score = grading.getScore();
            String comment = grading.getComment();
            double maxScore = grading.getGradingCriteria().getScore();
            comments.append(String.format("%s: %s/%.2f\n\n", criteriaName, comment, maxScore));
        }
        // Assuming the freeform comment is appended last
        if (!gradings.isEmpty() && gradings.get(0).getStudent().getFreeformComment() != null) {
            comments.append("\nAdd on comment: ").append(gradings.get(0).getStudent().getFreeformComment());
        }
        // Set final comments
        String finalComments = comments.toString();
        student.setFinalComment(finalComments); // Update student with final comments
        studentRepository.save(student); // Save the student record with updated comments
        return finalComments;
    }

	public byte[] generateDetailedExcelReport() {
		try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
			// Initialize the workbook and sheet
			XSSFSheet sheet = workbook.createSheet("Detailed Grades");
			
			// Create a cell style for wrapping text
			CellStyle wrapStyle = workbook.createCellStyle();
			wrapStyle.setWrapText(true);

			// Fetch all the data needed for the report
			List<String> groupNames = fetchUniqueGradingCriteriaGroupNames(); // Implement this method
			List<Student> students = studentRepository.findAll(); // Assuming there is a method in your repository

			// Create the header row with group names
			Row groupHeaderRow = sheet.createRow(0);
			int groupCellIndex = 1; // Start from the second column
			

			Cell asuriteHeaderCell = groupHeaderRow.createCell(0);
			asuriteHeaderCell.setCellValue("ASURite IDs");
			
			
			// Create the second row with criteria names
			Row criteriaHeaderRow = sheet.createRow(1);
			int criteriaCellIndex = 1; // Start from the second column
			for (String groupName : groupNames) {
			    List<GradingCriteria> criteria = fetchGradingCriteriaByGroupName(groupName);
			    for (GradingCriteria criterion : criteria) {
			        // Set the criteria name
			    	Cell groupCell = groupHeaderRow.createCell(criteriaCellIndex);
			    	groupCell.setCellValue(groupName);
			    	groupCell.setCellStyle(wrapStyle);
			    	
			        Cell criteriaNameCell = criteriaHeaderRow.createCell(criteriaCellIndex);
			        criteriaNameCell.setCellValue(criterion.getCriteriaName());

			        criteriaNameCell.setCellStyle(wrapStyle);
			        
			     

			        // Skip the next cell for points (it will be empty, but space is reserved for the data row)
			        criteriaCellIndex += 2; // Increment by 2 to account for the points and comments columns
			    }
			}

			// Fill in student data starting from the third row
			for (int i = 0; i < students.size(); i++) {
			    Student student = students.get(i);
			    Row studentRow = sheet.createRow(i + 2); // Offset by 2 to account for header rows

			    // Set the ASURite ID in the first column
			    Cell asuriteCell = studentRow.createCell(0);
			    asuriteCell.setCellValue(student.getAsurite());

			    // Fill in points and comments for each student, under each criterion
			    int studentDataCellIndex = 1; // Start from the second column
			    for (String groupName : groupNames) {
			        List<GradingCriteria> criteria = fetchGradingCriteriaByGroupName(groupName);
			        for (GradingCriteria criterion : criteria) {
			            // Fetch the corresponding StudentGrading object
			            StudentGrading grading = studentGradingRepository.findByStudentIdAndGradingCriteriaId(student.getId(), criterion.getId())
			                                        .orElse(new StudentGrading()); // Use a default empty object if not found

			            // Set points and comments in consecutive cells
			            studentRow.createCell(studentDataCellIndex++).setCellValue(grading.getScore());
			            studentRow.createCell(studentDataCellIndex++).setCellValue(grading.getComment());
			        }
			    }
			}

			// Auto-size columns based on the content
			for (int i = 0; i < groupCellIndex; i++) {
			    sheet.autoSizeColumn(i);
			}
			
			// Auto-size columns based on the content
						for (int i = 0; i < criteriaCellIndex; i++) {
						    sheet.autoSizeColumn(i);
						}

			// Write the workbook to an output stream
			ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
			workbook.write(outputStream);
			workbook.close();

			// Return the byte array of the output stream
			return outputStream.toByteArray();

        } catch (Exception e) {
            throw new RuntimeException("Failed to generate the grading Excel report", e);
        }
    }

    private List<String> fetchUniqueGradingCriteriaGroupNames() {
        // This needs to fetch distinct grading criteria group names from the grading criteria repository
        return gradingCriteriaRepository.findAll().stream()
                .map(GradingCriteria::getGradingCriteriaGroupName)
                .distinct()
                .collect(Collectors.toList());
    }

    private List<GradingCriteria> fetchGradingCriteriaByGroupName(String groupName) {
        // This should fetch all grading criteria belonging to the specified group name
        return gradingCriteriaRepository.findByGradingCriteriaGroupName(groupName);
    }
	
}

