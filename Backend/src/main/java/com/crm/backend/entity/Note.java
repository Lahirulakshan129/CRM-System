package com.crm.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDateTime;

@Entity
@Table(name = "notes")
@Data
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private String createdBy;
    private LocalDateTime createdAt;

    @ManyToOne
    @JoinColumn(name = "lead_id")
    private Lead lead;
}