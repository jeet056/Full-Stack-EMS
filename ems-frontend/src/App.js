// src/App.js
import React, { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Sidebar from './components/Sidebar';
import EmployeeList from './components/EmployeeList';
import PayrollList from './components/PayrollList';
import AttendanceList from './components/AttendanceList';
import OverallCharts from './components/OverallCharts';

const App = () => {
  const [selectedSection, setSelectedSection] = useState('employees');

  const renderSection = () => {
    switch (selectedSection) {
      case 'employees':
        return <EmployeeList />;
      case 'payroll':
        return <PayrollList />;
      case 'attendance':
        return <AttendanceList />;
      case 'charts':
        return <OverallCharts />;
      default:
        return <EmployeeList />;
    }
  };

  return (
    <div className="flex">
      <Sidebar setSelectedSection={setSelectedSection} />
      <AnimatePresence mode="wait">
        <motion.div
          className="flex-1 p-4"
          key={selectedSection}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          {renderSection()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default App;