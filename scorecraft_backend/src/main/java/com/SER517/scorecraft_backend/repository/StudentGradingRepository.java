package com.SER517.scorecraft_backend.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SER517.scorecraft_backend.model.StudentGrading;

@Repository
public interface StudentGradingRepository extends JpaRepository<StudentGrading, Long> {
	 Optional<StudentGrading> findByStudentIdAndGradingCriteriaId(Long studentId, Long gradingCriteriaId);
}
