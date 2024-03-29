package com.SER517.scorecraft_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.SER517.scorecraft_backend.repository")
@EntityScan(basePackages = "com.SER517.scorecraft_backend.model")
@EnableTransactionManagement
public class ScorecraftBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScorecraftBackendApplication.class, args);
	}

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return (WebMvcConfigurer) new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedMethods("*")
                        .allowedOrigins("http://localhost:3000");
            }
        };
    }

}
