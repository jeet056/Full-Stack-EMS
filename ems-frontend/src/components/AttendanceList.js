// src/components/AttendanceList.js
import React, { useState, useEffect } from 'react';
import { getAllAttendances, createAttendance, getAllEmployees } from '../services/api';

const AttendanceList = () => {
  const [attendances, setAttendances] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAttendance, setNewAttendance] = useState({
    employeeId: '',
    date: '',
    present: true
  });

  useEffect(() => {
    fetchAttendances();
    fetchEmployees();
  }, []);

  const fetchAttendances = async () => {
    try {
      const response = await getAllAttendances();
      console.log('Fetched attendances:', response.data);
      setAttendances(response.data);
    } catch (error) {
      console.error('Error fetching attendance:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      console.log('Fetched employees:', response.data);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const attendanceData = {
        employee: { id: parseInt(newAttendance.employeeId) },
        date: newAttendance.date,
        present: newAttendance.present
      };
      await createAttendance(attendanceData);
      fetchAttendances();
      setShowForm(false);
      setNewAttendance({ employeeId: '', date: '', present: true });
    } catch (error) {
      console.error('Error creating attendance:', error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Attendance Records</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Attendance
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Employee:</label>
              <select
                value={newAttendance.employeeId}
                onChange={(e) => setNewAttendance({...newAttendance, employeeId: e.target.value})}
                className="w-full p-2 border rounded"
                required
              >
                <option value="">Select Employee</option>
                {employees.map(emp => (
                  <option key={emp.id} value={emp.id}>
                    {emp.firstName} {emp.lastName}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block mb-1">Date:</label>
              <input
                type="date"
                value={newAttendance.date}
                onChange={(e) => setNewAttendance({...newAttendance, date: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Status:</label>
              <select
                value={newAttendance.present}
                onChange={(e) => setNewAttendance({...newAttendance, present: e.target.value === 'true'})}
                className="w-full p-2 border rounded"
                required
              >
                <option value="true">Present</option>
                <option value="false">Absent</option>
              </select>
            </div>
            <div className="flex space-x-2">
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">Employee Name</th>
            <th className="py-2 px-4 border-b">Date</th>
            <th className="py-2 px-4 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {attendances && attendances.length > 0 ? (
            attendances.map((attendance) => (
              <tr key={attendance.id} className="hover:bg-gray-50">
                <td className="py-2 px-4 border-b">
                  {attendance.employee ? `${attendance.employee.firstName} ${attendance.employee.lastName}` : 'Unknown'}
                </td>
                <td className="py-2 px-4 border-b">{new Date(attendance.date).toLocaleDateString()}</td>
                <td className="py-2 px-4 border-b">
                  <span className={`px-2 py-1 rounded ${attendance.present ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {attendance.present ? 'Present' : 'Absent'}
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="py-2 px-4 text-center">No attendance records found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceList;