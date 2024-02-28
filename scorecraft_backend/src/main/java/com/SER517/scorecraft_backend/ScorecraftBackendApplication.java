package com.SER517.scorecraft_backend;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

@SpringBootApplication
@EnableJpaRepositories(basePackages = "com.SER517.scorecraft_backend.repository")
@EntityScan(basePackages = "com.SER517.scorecraft_backend.model")
@ComponentScan(basePackages = "com.SER517.scorecraft_backend")
public class ScorecraftBackendApplication {

	public static void main(String[] args) {
		SpringApplication.run(ScorecraftBackendApplication.class, args);
	}

}
