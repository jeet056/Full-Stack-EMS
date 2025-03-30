import React, { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  if (!user) return null; // Hide Sidebar if not logged in

  return (
    <div className="relative">
      <button
        id="toggleBtn"
        onClick={() => setIsOpen(!isOpen)}
        className="absolute top-4 left-4 bg-gray-800 text-white px-3 py-2 rounded"
      >
        ☰
      </button>
      <div
        className={`w-64 bg-gray-800 text-white h-screen ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } transition-transform duration-300`}
      >
        <ul>
          <li className="p-4 hover:bg-gray-700 cursor-pointer">
            <button
              className="absolute top-1 left-1 bg-gray-800 text-white px-3 py-2 rounded"
              onClick={() => setIsOpen(!isOpen)}
            >
              ☰
            </button>
          </li>
          <li className="p-4 hover:bg-gray-700">
            <Link to="/employees" onClick={() => setIsOpen(false)}>
              Employees
            </Link>
          </li>
          {user.role === 'ADMIN' && (
            <li className="p-4 hover:bg-gray-700">
              <Link to="/payroll" onClick={() => setIsOpen(false)}>
                Payroll
              </Link>
            </li>
          )}
          <li className="p-4 hover:bg-gray-700">
            <Link to="/attendance" onClick={() => setIsOpen(false)}>
              Attendance
            </Link>
          </li>
          {user.role === 'ADMIN' && (
            <li className="p-4 hover:bg-gray-700">
              <Link to="/charts" onClick={() => setIsOpen(false)}>
                Charts
              </Link>
            </li>
          )}
          <li className="p-4 hover:bg-gray-700">
            <button
              onClick={() => {
                logout();
                navigate('/login');
                setIsOpen(false);
              }}
              className="text-white"
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Sidebar;