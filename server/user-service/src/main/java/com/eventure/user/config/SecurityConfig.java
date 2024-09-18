package com.eventure.user.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.oauth2.jwt.JwtDecoder;
import org.springframework.security.oauth2.jwt.NimbusJwtDecoder;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .cors().and().csrf().disable() // Disable CSRF if not using it
                .authorizeHttpRequests(authz -> authz
                        .requestMatchers("/", "/login").permitAll() // Allow public access to certain endpoints
                        .requestMatchers("/dashboard/**").hasAuthority("user") // Require "user" role for dashboard
                        .anyRequest().authenticated() // Require authentication for other requests
                )
                .oauth2ResourceServer(oauth2 -> oauth2
                        .jwt(jwt -> jwt.decoder(jwtDecoder()))
                );

        return http.build();
    }

    @Bean
    public JwtDecoder jwtDecoder() {
        return NimbusJwtDecoder.withJwkSetUri("http://localhost:8080/auth/realms/danilo_eventure/protocol/openid-connect/certs")
                .build();
    }
}
