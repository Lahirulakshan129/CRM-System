package com.crm.backend.enums;

import lombok.Getter;

@Getter
public enum LeadSource {

    WEBSITE("Website"),
    REFERRAL("Referral"),
    SOCIAL_MEDIA("Social Media"),
    ADVERTISEMENT("Advertisement"),
    DIRECT("Direct");

    private final String label;

    LeadSource(String label) {
        this.label = label;
    }

}