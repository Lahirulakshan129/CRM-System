package com.crm.backend.entity;

import com.crm.backend.enums.LeadSource;
import com.crm.backend.enums.LeadStatus;
import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "leads")
@Data
public class Lead {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String company;
    private String email;
    private String phone;

    @Enumerated(EnumType.STRING)
    private LeadSource source;
    private String assignedSalesperson;

    @Enumerated(EnumType.STRING)
    private LeadStatus status;

    private Double dealValue;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @OneToMany(mappedBy = "lead", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Note> notes;
}