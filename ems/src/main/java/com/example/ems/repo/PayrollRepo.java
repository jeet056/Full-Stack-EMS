package com.example.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ems.model.Payroll;


public interface PayrollRepo extends JpaRepository<Payroll, Long> {
    List<Payroll> findByEmployeeId(Long employeeId);
}

