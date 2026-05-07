package com.crm.backend.service;

import com.crm.backend.dto.EnumOption;
import com.crm.backend.entity.User;
import com.crm.backend.enums.LeadSource;
import com.crm.backend.enums.LeadStatus;
import com.crm.backend.repository.LeadRepository;
import com.crm.backend.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.List;
import com.crm.backend.dto.EnumOption;
@Service
public class FilterService {

    private final LeadRepository leadRepository;
    private final UserRepository userRepository;

    public FilterService(
            LeadRepository leadRepository,
            UserRepository userRepository
    ) {
        this.leadRepository = leadRepository;
        this.userRepository = userRepository;
    }


    public List<EnumOption> getStatuses() {
        return Arrays.stream(LeadStatus.values())
                .map(s -> new EnumOption(s.name(), s.getLabel()))
                .toList();
    }

    public List<EnumOption> getSources() {
        return Arrays.stream(LeadSource.values())
                .map(s -> new EnumOption(s.name(), s.getLabel()))
                .toList();
    }

}