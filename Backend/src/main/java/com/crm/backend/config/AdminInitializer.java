package com.crm.backend.config;
import com.crm.backend.entity.User;
import com.crm.backend.enums.UserRole;
import com.crm.backend.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

@Configuration
public class AdminInitializer {

    @Bean
    CommandLineRunner initAdmin(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        return args -> {
            String adminEmail = "admin@crm.com";

            if (userRepository.findByEmail(adminEmail).isEmpty()) {
                User admin = new User();
                admin.setName("Admin");
                admin.setEmail(adminEmail);
                admin.setPassword(passwordEncoder.encode("password"));
                admin.setRole(UserRole.ADMIN);

                userRepository.save(admin);

                System.out.println("Default admin created");
            } else {
                System.out.println("Admin already exists");
            }
        };
    }
}
