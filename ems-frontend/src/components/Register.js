import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: 'USER', // Default role
  });
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate passwords match
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      await axios.post('https://full-stack-ems.onrender.com/api/auth/register', {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password,
        role: formData.role,
      });
      alert('Registration successful! Please login.');
      navigate('/login');
    } catch (err) {
      console.error('Registration failed', err);
      setError(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-blue p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Create Account</h2>
        
        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}
        
        <div className="mb-4 flex gap-2">
          <div className="flex-1">
            <label className="block mb-1">First Name</label>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="flex-1">
            <label className="block mb-1">Last Name</label>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
            minLength="6"
          />
        </div>
        
        <div className="mb-4">
          <label className="block mb-1">Confirm Password</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
        >
          Create Account
        </button>
        
        <div className="text-center">
          Already have an account? <Link to="/login" className="text-blue-500 hover:underline">Login</Link>
        </div>
      </form>
    </div>
  );
};

export default Register;