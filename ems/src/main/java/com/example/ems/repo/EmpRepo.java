package com.example.ems.repo;

import com.example.ems.model.Employee;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EmpRepo extends JpaRepository<Employee, Long> {
}
