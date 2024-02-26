package com.SER517.scorecraft_backend.repository;

import com.SER517.scorecraft_backend.model.GradingCriteria;

import java.util.List;

public interface GradingRepository {
    List<GradingCriteria> findAll();

    GradingCriteria save(GradingCriteria gradingCriteria);
}
