package com.example.ems.controller;

import com.example.ems.model.Attendance;
import com.example.ems.service.AttendanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/attendances")
public class AttendanceController {
    @Autowired
    private AttendanceService attendanceService;

    @PostMapping
    public ResponseEntity<Attendance> createAttendance(@RequestBody Attendance attendance) {
        return new ResponseEntity<>(attendanceService.createAttendance(attendance), HttpStatus.CREATED);
    }

    @GetMapping("/employee/{employeeId}")
    public ResponseEntity<List<Attendance>> getAttendancesByEmployee(@PathVariable Long employeeId) {
        return new ResponseEntity<>(attendanceService.getAttendancesByEmployee(employeeId), HttpStatus.OK);
    }
}