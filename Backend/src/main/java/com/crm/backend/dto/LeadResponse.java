package com.crm.backend.dto;
import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class LeadResponse {
    private Long id;
    private String name;
    private String company;
    private String email;
    private String phone;
    private String source;
    private String assignedSalesperson;
    private String status;
    private Double dealValue;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<NoteResponse> notes;
}