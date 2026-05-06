package com.crm.backend.controller;
import com.crm.backend.entity.Lead;
import com.crm.backend.repository.LeadRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dashboard")
@CrossOrigin(origins = "*")
public class DashboardController {
    @Autowired
    private LeadRepository leadRepository;

    @GetMapping("/stats")
    public ResponseEntity<Map<String, Object>> getStats() {
        Map<String, Object> stats = new HashMap<>();
        long totalLeads = leadRepository.count();
        long newLeads = leadRepository.findAll().stream().filter(l -> "New".equals(l.getStatus())).count();
        long qualifiedLeads = leadRepository.findAll().stream().filter(l -> "Qualified".equals(l.getStatus())).count();
        long wonLeads = leadRepository.findAll().stream().filter(l -> "Won".equals(l.getStatus())).count();
        long lostLeads = leadRepository.findAll().stream().filter(l -> "Lost".equals(l.getStatus())).count();
        double totalDealValue = leadRepository.findAll().stream().mapToDouble(Lead::getDealValue).sum();
        double wonDealValue = leadRepository.findAll().stream().filter(l -> "Won".equals(l.getStatus())).mapToDouble(Lead::getDealValue).sum();

        stats.put("totalLeads", totalLeads);
        stats.put("newLeads", newLeads);
        stats.put("qualifiedLeads", qualifiedLeads);
        stats.put("wonLeads", wonLeads);
        stats.put("lostLeads", lostLeads);
        stats.put("totalDealValue", totalDealValue);
        stats.put("wonDealValue", wonDealValue);
        return ResponseEntity.ok(stats);
    }
}