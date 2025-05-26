package com.gotrip.Go_Trip;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Applied to all routes

                .allowedOriginPatterns("*") // Allowed all origins

                /*.allowedOrigins("")*/ // To allow one specific origin

                .allowedMethods("GET", "POST", "PUT", "DELETE") // Allowed this methods

                .allowedHeaders("*")
                .allowCredentials(true) // Allowed cookies
                .maxAge(1000*60*60*24); // Age = 24h
    }
}
