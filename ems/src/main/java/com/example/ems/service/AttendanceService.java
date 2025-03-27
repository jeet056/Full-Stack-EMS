package com.example.ems.service;

import com.example.ems.model.Attendance;
import com.example.ems.model.Employee;
import com.example.ems.repo.AttendanceRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AttendanceService {
    @Autowired
    private AttendanceRepo attendanceRepository;

    @Autowired
    private EmpService empService;

    public Attendance createAttendance(Attendance attendance) {
        Employee employee = empService.getEmployeeById(attendance.getEmployee().getId());
        attendance.setEmployee(employee);
        return attendanceRepository.save(attendance);
    }

    public List<Attendance> getAttendancesByEmployee(Long employeeId) {
        return attendanceRepository.findByEmployeeId(employeeId);
    }

    public List<Attendance> getAllAttendances() {
        return attendanceRepository.findAll();
    }
}