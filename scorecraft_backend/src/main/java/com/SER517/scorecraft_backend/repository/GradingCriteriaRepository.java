package com.SER517.scorecraft_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.SER517.scorecraft_backend.model.GradingCriteria;

@Repository
public interface GradingCriteriaRepository extends JpaRepository<GradingCriteria, Long> {
    // Additional custom queries or methods for grading criteria
}