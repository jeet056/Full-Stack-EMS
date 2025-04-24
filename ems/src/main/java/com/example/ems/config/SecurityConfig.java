package com.example.ems.config;

import com.example.ems.service.UserService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import java.util.Arrays;

@Configuration
public class SecurityConfig {

    private final UserService oauth2UserService;

    public SecurityConfig(UserService oauth2UserService) {
        this.oauth2UserService = oauth2UserService;
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(request -> {
                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(Arrays.asList("http://localhost:3000","https://full-stack-10oihg7sh-debojeet-bose-s-projects.vercel.app"));
                config.setAllowedMethods(Arrays.asList("GET", "POST", "PUT", "DELETE"));
                config.setAllowCredentials(true);
                return config;
            }))
            .oauth2Login(oauth2 -> oauth2
                .userInfoEndpoint(userInfo -> userInfo.userService(oauth2UserService))
                .loginPage("/login")
            )
            .authorizeHttpRequests(auth -> auth
                .requestMatchers("/auth/**").permitAll()
                .requestMatchers("/employees/**").hasRole("ADMIN")
                .requestMatchers("/payrolls/**", "/attendances/**").hasAnyRole("ADMIN", "USER")
                .anyRequest().authenticated()
            )
            .logout(logout -> logout
                .logoutSuccessUrl("/")
            );
        return http.build();
    }
}