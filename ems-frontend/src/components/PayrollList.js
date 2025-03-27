import React, { useState, useEffect } from 'react';
import { getAllPayrolls, createPayroll, getAllEmployees } from '../services/api';

const PayrollList = () => {
  const [payrolls, setPayrolls] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newPayroll, setNewPayroll] = useState({
    employeeId: '',
    amount: '',
    paymentDate: ''
  });

  useEffect(() => {
    fetchPayrolls();
    fetchEmployees();
  }, []);

  const fetchPayrolls = async () => {
    try {
      const response = await getAllPayrolls();
      console.log('Received payroll data:', response.data);
      setPayrolls(response.data);
    } catch (error) {
      console.error('Error fetching payrolls:', error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const response = await getAllEmployees();
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const payrollData = {
            employee: { id: parseInt(newPayroll.employeeId) },
            amount: parseFloat(newPayroll.amount),
            paymentDate: newPayroll.paymentDate
        };
        console.log('Sending payroll data:', payrollData);
        await createPayroll(payrollData);
        fetchPayrolls();
        setShowForm(false);
        setNewPayroll({ employeeId: '', amount: '', paymentDate: '' });
      } catch (error) {
        console.error('Error creating payroll:', error);
      }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Payroll Records</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Add New Payroll
        </button>
      </div>

      {showForm && (
        <div className="mb-4 p-4 bg-gray-100 rounded">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-1">Employee:</label>
              <select
                value={newPayroll.employeeId}
                onChange={(e) => setNewPayroll({...newPayroll, employeeId: e.target.value})}
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
              <label className="block mb-1">Amount:</label>
              <input
                type="number"
                value={newPayroll.amount}
                onChange={(e) => setNewPayroll({...newPayroll, amount: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            <div>
              <label className="block mb-1">Payment Date:</label>
              <input
                type="date"
                value={newPayroll.paymentDate}
                onChange={(e) => setNewPayroll({...newPayroll, paymentDate: e.target.value})}
                className="w-full p-2 border rounded"
                required
              />
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
            <th className="py-2 px-4 border-b">Amount</th>
            <th className="py-2 px-4 border-b">Date</th>
          </tr>
        </thead>
        <tbody>
          {payrolls.map((payroll) => (
            <tr key={payroll.id} className="hover:bg-gray-50">
              <td className="py-2 px-4 border-b">
                 {payroll.employee && `${payroll.employee.firstName} ${payroll.employee.lastName}`}
              </td>
              <td className="py-2 px-4 border-b">${payroll.amount}</td>
              <td className="py-2 px-4 border-b">
                {console.log('Payroll payment date:', payroll.paymentDate)}
                {payroll.paymentDate ? new Date(payroll.paymentDate).toLocaleDateString() : 'N/A'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PayrollList;