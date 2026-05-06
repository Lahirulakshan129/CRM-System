package com.crm.backend.controller;

import com.crm.backend.dto.LeadRequest;
import com.crm.backend.dto.LeadResponse;
import com.crm.backend.dto.NoteRequest;
import com.crm.backend.dto.NoteResponse;
import com.crm.backend.service.LeadService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/leads")
@CrossOrigin(origins = "*")
public class LeadController {
    @Autowired
    private LeadService leadService;

    @GetMapping
    public ResponseEntity<List<LeadResponse>> getLeads(
            @RequestParam(required = false) String status,
            @RequestParam(required = false) String source,
            @RequestParam(required = false) String salesperson,
            @RequestParam(required = false) String search) {
        return ResponseEntity.ok(leadService.getAllLeads(status, source, salesperson, search));
    }

    @PostMapping
    public ResponseEntity<LeadResponse> createLead(@Valid @RequestBody LeadRequest request) {
        return ResponseEntity.ok(leadService.createLead(request));
    }

    @GetMapping("/{id}")
    public ResponseEntity<LeadResponse> getLead(@PathVariable Long id) {
        return ResponseEntity.ok(leadService.getLeadById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<LeadResponse> updateLead(@PathVariable Long id, @Valid @RequestBody LeadRequest request) {
        return ResponseEntity.ok(leadService.updateLead(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteLead(@PathVariable Long id) {
        leadService.deleteLead(id);
        return ResponseEntity.noContent().build();
    }

    @PostMapping("/{id}/notes")
    public ResponseEntity<NoteResponse> addNote(@PathVariable Long id, @Valid @RequestBody NoteRequest request) {
        return ResponseEntity.ok(leadService.addNote(id, request));
    }
}
