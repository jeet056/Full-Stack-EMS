import React, { useState } from "react";
import EmployeeList from "./components/EmployeeList";
import EmployeeForm from "./components/EmployeeForm";

function App() {
  const [employeeToEdit, setEmployeeToEdit] = useState(null);
  const [refresh, setRefresh] = useState(false);

  const handleEdit = (employee) => {
    setEmployeeToEdit(employee);
  };

  const handleSave = () => {
    setEmployeeToEdit(null); // Clear edit mode
    setRefresh(!refresh); // Trigger list refresh
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">
        Employee Management System
      </h1>
      <EmployeeForm employeeToEdit={employeeToEdit} onSave={handleSave} />
      <EmployeeList onEdit={handleEdit} key={refresh} />
    </div>
  );
}

export default App;