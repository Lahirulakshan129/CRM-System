package com.crm.backend.repository;


import com.crm.backend.entity.Lead;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface LeadRepository extends JpaRepository<Lead, Long>, JpaSpecificationExecutor<Lead> {

    @Query("SELECT DISTINCT l.status FROM Lead l")
    List<String> findDistinctStatuses();

    @Query("SELECT DISTINCT l.source FROM Lead l")
    List<String> findDistinctSources();
}