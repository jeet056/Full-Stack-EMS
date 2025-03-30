import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import PayrollList from './components/PayrollList';
import AttendanceList from './components/AttendanceList';
import OverallCharts from './components/OverallCharts';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div className="flex">
          <Sidebar />
          <div className="flex-1 p-4">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/employees" element={
                <ProtectedRoute element={<EmployeeList />} />
              } />
              <Route path="/payroll" element={
                <ProtectedRoute element={<PayrollList />} requiredRole="ADMIN" />
              } />
              <Route path="/attendance" element={
                <ProtectedRoute element={<AttendanceList />} />
              } />
              <Route path="/charts" element={
                <ProtectedRoute element={<OverallCharts />} requiredRole="ADMIN" />
              } />
              <Route path="/" element={<Navigate to="/employees" />} />
            </Routes>
          </div>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;