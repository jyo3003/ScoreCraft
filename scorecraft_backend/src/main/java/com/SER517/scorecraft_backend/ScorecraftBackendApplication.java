package com.SER517.scorecraft_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.SER517.scorecraft_backend.repository")
public class ScorecraftBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScorecraftBackendApplication.class, args);
	}

}
