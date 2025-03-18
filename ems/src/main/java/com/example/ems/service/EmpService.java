package com.example.ems.service;

import com.example.ems.model.Employee;
import com.example.ems.repo.EmpRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class EmpService {

    @Autowired
    private EmpRepo ob;

    public Employee createEmployee(Employee employee) {
        return ob.save(employee);
    }

    public Employee getEmployeeById(Long id) {
        Optional<Employee> employee = ob.findById(id);
        return employee.orElseThrow(() -> new RuntimeException("Employee not found with ID: " + id));
    }

    public List<Employee> getAllEmployees() {
        return ob.findAll();
    }

    public Employee updateEmployee(Employee employeeDetails, Long id) {
        Employee employee = getEmployeeById(id); 
        employee.setFirstName(employeeDetails.getFirstName());
        employee.setLastName(employeeDetails.getLastName());
        employee.setEmail(employeeDetails.getEmail());
        return ob.save(employee);
    }

    public void deleteEmployee(Long id) {
        Employee employee = getEmployeeById(id); 
        ob.delete(employee);
    }
}