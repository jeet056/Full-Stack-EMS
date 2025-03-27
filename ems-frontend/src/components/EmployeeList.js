// src/components/EmployeeList.js
import React, { useState, useEffect } from 'react';
import { getAllEmployees, createEmployee , deleteEmployee, updateEmployee } from '../services/api';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (employee) => {
    try {
      await createEmployee(employee);
      fetchEmployees();
    } catch (error) {
      console.error('Error adding employee:', error);
    }
  };
  

  const handleEdit = async (employee) => {
    setSelectedEmployee(employee);
    setShowForm(true);
  };

  const handleUpdate = async (updatedEmployee) => {
    try {
      await updateEmployee(selectedEmployee.id, updatedEmployee);
      setShowForm(false);
      setSelectedEmployee(null);
      fetchEmployees(); // Refresh the list after update
    } catch (error) {
      console.error('Error updating employee:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await deleteEmployee(id);
        await fetchEmployees(); // Refresh the list after deletion
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Employees</h2>
        <button 
          onClick={() => {
            setSelectedEmployee(null);
            setShowForm(true);
          }}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Employee
        </button>
      </div>
      
      {showForm && (
        <EmployeeForm 
          employee={selectedEmployee}
          onSubmit={selectedEmployee ? handleUpdate : handleAddEmployee}
          onClose={() => {
            setShowForm(false);
            setSelectedEmployee(null);
          }}
        />
      )}

      <table className="min-w-full bg-white border border-gray-300">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 border-b">First Name</th>
            <th className="py-2 px-4 border-b">Last Name</th>
            <th className="py-2 px-4 border-b">Email</th>
            <th className="py-2 px-4 border-b">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">{employee.firstName}</td>
              <td className="py-2 px-4 border-b">{employee.lastName}</td>
              <td className="py-2 px-4 border-b">{employee.email}</td>
              <td className="py-2 px-4 border-b">
                <button
                  onClick={() => handleEdit(employee)}
                  className="bg-blue-500 text-white px-3 py-1 rounded mr-2 hover:bg-blue-600"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EmployeeList;