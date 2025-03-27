import React, { useState } from 'react';

function Sidebar({setSelectedSection}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
  <div className="relative">
    <button id="toggleBtn" 
    onClick={()=>setIsOpen(!isOpen)} className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded">
        ☰
    </button>
    <div className={`w-64 bg-gray-800 text-white h-screen ${isOpen ? "translate-x-0":"-translate-x-full"} transition-transform duration-300`}>
      <ul>
        <li className="p-4 hover:bg-gray-700 cursor-pointer">
        <button className="absolute top-1 left-1 bg-gray-800 text-white px-3 py-2 rounded"
        onClick={()=>setIsOpen(!isOpen)}>
          ☰
        </button>
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setSelectedSection('employees')}
        >
          Employees
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setSelectedSection('payroll')}
        >
          Payroll
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setSelectedSection('attendance')}
        >
          Attendance
        </li>
        <li
          className="p-4 hover:bg-gray-700 cursor-pointer"
          onClick={() => setSelectedSection('charts')}
        >
          Charts
        </li>
      </ul>
    </div>
  </div>  
  );
};

export default Sidebar;