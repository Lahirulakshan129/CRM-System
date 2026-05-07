package com.crm.backend.controller;
import com.crm.backend.dto.EnumOption;
import com.crm.backend.entity.User;
import com.crm.backend.service.FilterService;
import com.crm.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173")
public class FilterController {

    private final FilterService filterService;
    private final UserService userService;

    public FilterController(FilterService filterService, UserService userService) {
        this.filterService = filterService;
        this.userService = userService;
    }

    @GetMapping("/leads/statuses")
    public List<EnumOption> getStatuses() {
        return filterService.getStatuses();
    }

    @GetMapping("/leads/sources")
    public List<EnumOption> getSources() {
        return filterService.getSources();
    }

    @GetMapping("/users/salespeople")
    public List<User> getSalespeople() {
        List<User> salespeople;
        salespeople = userService.getSalespeople();
        return  salespeople;
    }
}