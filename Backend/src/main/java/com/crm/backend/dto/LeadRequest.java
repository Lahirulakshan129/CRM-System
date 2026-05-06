package com.crm.backend.dto;

import lombok.Data;

@Data
public class LeadRequest {
    private String name;
    private String company;
    private String email;
    private String phone;
    private String source;
    private String assignedSalesperson;
    private String status;
    private Double dealValue;
}