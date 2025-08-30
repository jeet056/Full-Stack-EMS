import React, { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, AuthContext } from './AuthContext';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import PayrollList from './components/PayrollList';
import AttendanceList from './components/AttendanceList';
import OverallCharts from './components/OverallCharts';
import Login from './components/Login';
import Register from './components/Register';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
  const { user, isLoading } = useContext(AuthContext);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="flex">
      {user && <Sidebar />}
      <div className={`${user ? 'flex-1 p-4' : 'w-full'}`}>
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
          <Route path="/" element={
            user ? <Navigate to="/employees" /> : <Navigate to="/login" />
          } />
        </Routes>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  );
};

export default App;