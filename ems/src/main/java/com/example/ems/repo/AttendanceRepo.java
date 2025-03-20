package com.example.ems.repo;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import com.example.ems.model.Attendance;


public interface AttendanceRepo extends JpaRepository<Attendance, Long> {
    List<Attendance> findByEmployeeId(Long employeeId);
}

