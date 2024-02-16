package com.ser517.scorecraft_backend.repository;

import org.springframework.stereotype.Repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.ser517.scorecraft_backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {
    // Additional custom queries or methods for students
}
