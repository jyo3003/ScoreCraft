package com.ser517.scorecraft_backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.ser517.scorecraft_backend.model.GradingCriteria;

@Repository
public interface GradingRepository extends JpaRepository<GradingCriteria, Long> {
    // Additional custom queries or methods for grading criteria
}