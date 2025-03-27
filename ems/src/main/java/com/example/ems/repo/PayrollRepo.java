package com.example.ems.repo;

import java.util.List;
import org.springframework.lang.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import com.example.ems.model.Payroll;

public interface PayrollRepo extends JpaRepository<Payroll, Long> {

    @Override
    @NonNull
    @Query("SELECT p FROM Payroll p JOIN FETCH p.employee")
    List<Payroll> findAll();
    
    List<Payroll> findByEmployeeId(Long employeeId);
}

