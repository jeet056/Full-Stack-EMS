package com.example.ems.service;

import com.example.ems.model.Employee;
import com.example.ems.repo.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Service
public class EmpDetailService implements UserDetailsService {
    @Autowired
    private EmpRepo employeeRepository;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Employee employee = employeeRepository.findByEmail(email);
        if (employee == null) {
            throw new UsernameNotFoundException("User not found with email: " + email);
        }
        return User.withUsername(employee.getEmail())
                   .password(employee.getPassword())
                   .authorities("ROLE_" + employee.getRole())
                   .build();
    }
}