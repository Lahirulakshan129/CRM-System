package com.crm.backend.dto;

import lombok.Data;
import java.time.LocalDateTime;

@Data
public class NoteResponse {
    private Long id;
    private String content;
    private String createdBy;
    private LocalDateTime createdAt;
}