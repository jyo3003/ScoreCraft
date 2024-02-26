package com.SER517.scorecraft_backend.service;
import com.SER517.scorecraft_backend.model.GradingCriteria;
import com.SER517.scorecraft_backend.repository.GradingRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class GradingCriteriaService {

    @Autowired
    private GradingRepository gradingRepository;

    public GradingCriteria save(GradingCriteria gradingCriteria) {
        return gradingRepository.save(gradingCriteria);
    }

    public List<GradingCriteria> findAll() {
        return gradingRepository.findAll();
    }

}

