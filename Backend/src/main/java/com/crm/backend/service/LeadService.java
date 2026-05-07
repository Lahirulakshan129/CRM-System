package com.crm.backend.service;

import com.crm.backend.dto.LeadRequest;
import com.crm.backend.dto.LeadResponse;
import com.crm.backend.dto.NoteRequest;
import com.crm.backend.dto.NoteResponse;
import com.crm.backend.entity.Lead;
import com.crm.backend.entity.Note;
import com.crm.backend.enums.LeadSource;
import com.crm.backend.enums.LeadStatus;
import com.crm.backend.repository.LeadRepository;
import com.crm.backend.repository.NoteRepository;
import jakarta.persistence.criteria.Predicate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class LeadService {
    @Autowired
    private LeadRepository leadRepository;
    @Autowired
    private NoteRepository noteRepository;

    public LeadResponse createLead(LeadRequest request) {
        Lead lead = new Lead();
        lead.setName(request.getName());
        lead.setCompany(request.getCompany());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setStatus(LeadStatus.valueOf(request.getStatus().toUpperCase()));
        lead.setSource(LeadSource.valueOf(request.getSource().toUpperCase()));
        lead.setAssignedSalesperson(request.getAssignedSalesperson());
        lead.setDealValue(request.getDealValue());
        lead.setCreatedAt(LocalDateTime.now());
        lead.setUpdatedAt(LocalDateTime.now());
        lead = leadRepository.save(lead);
        return convertToResponse(lead);
    }

    public LeadResponse updateLead(Long id, LeadRequest request) {
        Lead lead = leadRepository.findById(id).orElseThrow();
        lead.setName(request.getName());
        lead.setCompany(request.getCompany());
        lead.setEmail(request.getEmail());
        lead.setPhone(request.getPhone());
        lead.setStatus(LeadStatus.valueOf(request.getStatus().toUpperCase()));
        lead.setSource(LeadSource.valueOf(request.getSource().toUpperCase()));
        lead.setAssignedSalesperson(request.getAssignedSalesperson());
        lead.setDealValue(request.getDealValue());
        lead.setUpdatedAt(LocalDateTime.now());
        lead = leadRepository.save(lead);
        return convertToResponse(lead);
    }

    public void deleteLead(Long id) {
        leadRepository.deleteById(id);
    }

    public LeadResponse getLeadById(Long id) {
        Lead lead = leadRepository.findById(id).orElseThrow();
        return convertToResponse(lead);
    }

    public List<LeadResponse> getAllLeads(String status, String source, String salesperson, String search) {
        Specification<Lead> spec = (root, query, cb) -> {
            List<Predicate> predicates = new ArrayList<>();
            if (status != null && !status.isEmpty() && !status.equals("All")) {
                predicates.add(cb.equal(root.get("status"), status));
            }
            if (source != null && !source.isEmpty() && !source.equals("All")) {
                predicates.add(cb.equal(root.get("source"), source));
            }
            if (salesperson != null && !salesperson.isEmpty() && !salesperson.equals("All")) {
                predicates.add(cb.equal(root.get("assignedSalesperson"), salesperson));
            }
            if (search != null && !search.isEmpty()) {
                Predicate nameMatch = cb.like(cb.lower(root.get("name")), "%" + search.toLowerCase() + "%");
                Predicate emailMatch = cb.like(cb.lower(root.get("email")), "%" + search.toLowerCase() + "%");
                Predicate companyMatch = cb.like(cb.lower(root.get("company")), "%" + search.toLowerCase() + "%");
                predicates.add(cb.or(nameMatch, emailMatch, companyMatch));
            }
            return cb.and(predicates.toArray(new Predicate[0]));
        };
        List<Lead> leads = leadRepository.findAll(spec);
        return leads.stream().map(this::convertToResponse).collect(Collectors.toList());
    }

    public NoteResponse addNote(Long leadId, NoteRequest request) {
        Lead lead = leadRepository.findById(leadId).orElseThrow();
        Note note = new Note();
        note.setContent(request.getContent());
        note.setCreatedBy(request.getCreatedBy());
        note.setCreatedAt(LocalDateTime.now());
        note.setLead(lead);
        note = noteRepository.save(note);
        NoteResponse resp = new NoteResponse();
        resp.setId(note.getId());
        resp.setContent(note.getContent());
        resp.setCreatedBy(note.getCreatedBy());
        resp.setCreatedAt(note.getCreatedAt());
        return resp;
    }

    private LeadResponse convertToResponse(Lead lead) {
        LeadResponse resp = new LeadResponse();
        resp.setId(lead.getId());
        resp.setName(lead.getName());
        resp.setCompany(lead.getCompany());
        resp.setEmail(lead.getEmail());
        resp.setPhone(lead.getPhone());
        resp.setSource(String.valueOf(lead.getSource()));
        resp.setAssignedSalesperson(lead.getAssignedSalesperson());
        resp.setStatus(String.valueOf(lead.getStatus()));
        resp.setDealValue(lead.getDealValue());
        resp.setCreatedAt(lead.getCreatedAt());
        resp.setUpdatedAt(lead.getUpdatedAt());
        if (lead.getNotes() != null) {
            List<NoteResponse> noteResponses = lead.getNotes().stream().map(note -> {
                NoteResponse nr = new NoteResponse();
                nr.setId(note.getId());
                nr.setContent(note.getContent());
                nr.setCreatedBy(note.getCreatedBy());
                nr.setCreatedAt(note.getCreatedAt());
                return nr;
            }).collect(Collectors.toList());
            resp.setNotes(noteResponses);
        }
        return resp;
    }
}