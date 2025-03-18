import React, { useEffect, useState } from "react";
import { getAllEmployees, deleteEmployee } from "../services/api";

const EmployeeList = ({ onEdit }) => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error("Error fetching employees:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteEmployee(id);
      fetchEmployees(); // Refresh list
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  };

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Employee List</h2>
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4 text-left">ID</th>
            <th className="py-2 px-4 text-left">First Name</th>
            <th className="py-2 px-4 text-left">Last Name</th>
            <th className="py-2 px-4 text-left">Email</th>
            <th className="py-2 px-4 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id} className="border-t">
              <td className="py-2 px-4">{employee.id}</td>
              <td className="py-2 px-4">{employee.firstName}</td>
              <td className="py-2 px-4">{employee.lastName}</td>
              <td className="py-2 px-4">{employee.email}</td>
              <td className="py-2 px-4">
                <button
                  onClick={() => onEdit(employee)}
                  className="text-blue-600 hover:underline mr-4"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(employee.id)}
                  className="text-red-600 hover:underline"
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