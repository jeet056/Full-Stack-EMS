package com.example.ems.service;

import com.example.ems.model.Payroll;
import com.example.ems.repo.PayrollRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class PayrollService {
    @Autowired
    private PayrollRepo payrollRepository;

    public Payroll createPayroll(Payroll payroll) {
        return payrollRepository.save(payroll);
    }

    public List<Payroll> getPayrollsByEmployee(Long employeeId) {
        return payrollRepository.findByEmployeeId(employeeId);
    }
}