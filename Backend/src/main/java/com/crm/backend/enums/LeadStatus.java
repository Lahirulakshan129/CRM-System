package com.crm.backend.enums;

import lombok.Getter;

@Getter
public enum LeadStatus {
    NEW("New"),
    CONTACTED("Contacted"),
    QUALIFIED("Qualified"),
    PROPOSAL("Proposal Sent"),
    WON("Won"),
    LOST("Lost");

    private final String label;

    LeadStatus(String label) {
        this.label = label;
    }
}