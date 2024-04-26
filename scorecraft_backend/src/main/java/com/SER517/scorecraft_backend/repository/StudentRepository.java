package com.SER517.scorecraft_backend.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.SER517.scorecraft_backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByGroupNameNotNull();
    boolean existsByGroupNameIsNull(); // Check for null group names
    
    
    @Query("SELECT CASE WHEN COUNT(s) > 0 THEN TRUE ELSE FALSE END FROM Student s WHERE s.groupName = '' OR s.groupName IS NULL")
    boolean existsByGroupNameNullOrEmpty(); // Check for null or empty group names
    
    // Additional custom queries or methods for students
    @Query("SELECT s FROM Student s WHERE s.groupName = (SELECT s2.groupName FROM Student s2 WHERE s2.id = :studentId)")
    List<Student> findGroupMembersByStudentId(Long studentId);
}
