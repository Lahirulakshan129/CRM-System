package com.crm.backend.dto;

import lombok.Data;

@Data
public class NoteRequest {
    private String content;
    private String createdBy;
}