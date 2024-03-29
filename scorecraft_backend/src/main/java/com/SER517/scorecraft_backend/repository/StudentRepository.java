package com.SER517.scorecraft_backend.repository;

import org.springframework.stereotype.Repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.SER517.scorecraft_backend.model.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, Long> {

    boolean existsByGroupNameNotNull();
    // Additional custom queries or methods for students
    @Query("SELECT s FROM Student s WHERE s.groupName = (SELECT s2.groupName FROM Student s2 WHERE s2.id = :studentId)")
    List<Student> findGroupMembersByStudentId(Long studentId);
}
