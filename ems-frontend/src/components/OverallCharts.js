// src/components/OverallCharts.js
import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { getAllPayrolls, getAllAttendances } from '../services/api';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const OverallCharts = () => {
  const [payrollData, setPayrollData] = useState([]);
  const [attendanceData, setAttendanceData] = useState([]);

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const payrollResponse = await getAllPayrolls();
        setPayrollData(payrollResponse.data);
        const attendanceResponse = await getAllAttendances();
        setAttendanceData(attendanceResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  // Aggregate payroll data (sum of all amounts)
  const totalPayroll = payrollData.reduce((acc, payroll) => acc + payroll.amount, 0);

  // Aggregate attendance data (count present vs. absent)
  const totalPresent = attendanceData.filter(att => att.present).length;
  const totalAbsent = attendanceData.length - totalPresent;

  // Payroll chart data
  const payrollChartData = {
    labels: ['Total Payroll'],
    datasets: [
      {
        label: 'Total Payroll Amount',
        data: [totalPayroll],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  // Attendance chart data
  const attendanceChartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        label: 'Attendance Summary',
        data: [totalPresent, totalAbsent],
        backgroundColor: ['rgba(153, 102, 255, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  return (
    <div className="mt-6">
      <h3 className="text-xl font-semibold">Overall Payroll Summary</h3>
      <Bar data={payrollChartData} />
      <h3 className="text-xl font-semibold mt-4">Overall Attendance Summary</h3>
      <Bar data={attendanceChartData} />
    </div>
  );
};

export default OverallCharts;