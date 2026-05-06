package com.crm.backend;

import com.crm.backend.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class CrmApplication implements CommandLineRunner {
	@Autowired
	private AuthService authService;

	public static void main(String[] args) {
		SpringApplication.run(CrmApplication.class, args);
	}

	@Override
	public void run(String... args) {
		authService.initAdminUser();
	}
}
