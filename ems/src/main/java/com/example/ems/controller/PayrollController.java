package com.example.ems.controller;

import com.example.ems.model.Payroll;
import com.example.ems.service.PayrollService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/payrolls")
public class PayrollController {
    @Autowired
    private PayrollService payrollService;

    @PostMapping
    public ResponseEntity<Payroll> createPayroll(@RequestBody Payroll payroll) {
        return new ResponseEntity<>(payrollService.createPayroll(payroll), HttpStatus.CREATED);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Payroll>> getPayrollsByEmployee(@PathVariable Long employeeId) {
        return new ResponseEntity<>(payrollService.getPayrollsByEmployee(employeeId), HttpStatus.OK);
    }

    @GetMapping
    public ResponseEntity<List<Payroll>> getAllPayrolls() {
        return new ResponseEntity<>(payrollService.getAllPayrolls(), HttpStatus.OK);
    }
}