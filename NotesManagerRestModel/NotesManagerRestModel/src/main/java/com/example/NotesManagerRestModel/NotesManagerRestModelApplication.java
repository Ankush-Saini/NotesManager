package com.example.NotesManagerRestModel;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@SpringBootApplication
@EnableScheduling
public class NotesManagerRestModelApplication {

	public static void main(String[] args) {
		SpringApplication.run(NotesManagerRestModelApplication.class, args);
	}

	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/users").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/{userId}/notes/").allowedOrigins("http://localhost:3000");
				registry.addMapping("/users/{userId}/deleted-notes/").allowedOrigins("http://localhost:3000");
			}
		};
	}
}


