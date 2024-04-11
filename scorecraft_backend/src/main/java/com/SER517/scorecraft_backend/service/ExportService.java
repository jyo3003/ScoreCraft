package com.SER517.scorecraft_backend.service;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
            double maxScore = grading.getGradingCriteria().getScore();
            comments.append(String.format("%s: %.2f/%.2f\n", criteriaName, score, maxScore));
        }
        // Assuming the freeform comment is appended last
        if (!gradings.isEmpty() && gradings.get(0).getStudent().getFreeformComment() != null) {
            comments.append("Add on comment: ").append(gradings.get(0).getStudent().getFreeformComment());
        }
        // Set final comments
        String finalComments = comments.toString();
        student.setFinalComment(finalComments); // Update student with final comments
        studentRepository.save(student); // Save the student record with updated comments
        return finalComments;
    }

	public byte[] generateDetailedExcelReport() {
		try (XSSFWorkbook workbook = new XSSFWorkbook(); ByteArrayOutputStream out = new ByteArrayOutputStream()) {
            XSSFSheet sheet = workbook.createSheet("Grading Report");

            // Fetch unique group names and their associated criteria
            List<String> groupNames = fetchUniqueGradingCriteriaGroupNames();
            Map<String, List<GradingCriteria>> criteriaByGroup = groupNames.stream()
                    .collect(Collectors.toMap(groupName -> groupName, this::fetchGradingCriteriaByGroupName, (a, b) -> b, LinkedHashMap::new));

            // Create the header row
            Row headerRow = sheet.createRow(0);
            int cellIndex = 0;
            for (String groupName : groupNames) {
                List<GradingCriteria> criteriaList = criteriaByGroup.get(groupName);
                for (GradingCriteria criteria : criteriaList) {
                    headerRow.createCell(cellIndex++).setCellValue(criteria.getCriteriaName());
                    headerRow.createCell(cellIndex++).setCellValue("points");
                    headerRow.createCell(cellIndex++).setCellValue("comment");
                }
            }

            // Fetch the students
            List<Student> students = studentRepository.findAll();

            // Populate the data rows for each student
            int rowIndex = 1;
            for (Student student : students) {
                Row row = sheet.createRow(rowIndex++);
                cellIndex = 0;
                for (String groupName : groupNames) {
                    List<GradingCriteria> criteriaList = criteriaByGroup.get(groupName);
                    // Extract the criteria IDs from the criteriaList
                    List<Long> criteriaIds = criteriaList.stream()
                            .map(GradingCriteria::getId)
                            .collect(Collectors.toList());

                    // Fetch StudentGrading entities based on the student ID and the criteria IDs
                    List<StudentGrading> gradings = studentGradingRepository.findByStudentIdAndGradingCriteriaIdIn(student.getId(), criteriaIds);
                    for (GradingCriteria criteria : criteriaList) {
                        // Find the specific grading for the current criteria
                        StudentGrading grading = gradings.stream()
                                .filter(g -> g.getGradingCriteria().getId().equals(criteria.getId()))
                                .findFirst()
                                .orElse(new StudentGrading()); // Or handle the absence of grading differently

                        row.createCell(cellIndex++).setCellValue(grading.getScore());
                        row.createCell(cellIndex++).setCellValue(grading.getComment());
                    }
                }
            }

            // Resize all columns to fit the content size
            for (int i = 0; i < cellIndex; i++) {
                sheet.autoSizeColumn(i);
            }

            // Write the output to a byte array
            workbook.write(out);
            return out.toByteArray();
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

