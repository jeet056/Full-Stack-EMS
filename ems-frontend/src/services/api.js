import axios from 'axios';

const api = axios.create({
  baseURL: 'https://full-stack-ems.onrender.com',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true
});

// Remove token for auth endpoints
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to: ${config.url}`);
    
    // Don't send Authorization header for auth endpoints
    if (config.url.includes('/api/auth/')) {
      delete config.headers.Authorization;
      console.log('Auth endpoint detected, not sending Authorization header');
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Adding Authorization header for authenticated request');
      }
    }
    
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => {
    console.log(`Response from ${response.config.url}:`, response.status);
    return response;
  },
  (error) => {
    if (error.response) {
      console.error('API Error:', {
        status: error.response.status,
        data: error.response.data,
        url: error.config.url,
        method: error.config.method,
        headers: error.config.headers
      });
      
      if (error.response.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      }
    } else if (error.request) {
      console.error('No response received:', error.request);
    } else {
      console.error('Error setting up request:', error.message);
    }
    return Promise.reject(error);
  }
);

export const getAllEmployees = () => api.get('/employees');
export const getEmployeeById = (id) => api.get(`/employees/${id}`);
export const createEmployee = (employee) => api.post('/employees', employee);
export const updateEmployee = (id, employee) => api.put(`/employees/${id}`, employee);
export const deleteEmployee = (id) => api.delete(`/employees/${id}`);

export const createPayroll = (payroll) => api.post('/payrolls', payroll);
export const getPayrollsByEmployee = (employeeId) => api.get(`/payrolls/employee/${employeeId}`);
export const getAllPayrolls = () => api.get('/payrolls');

export const createAttendance = (attendance) => api.post('/attendances', attendance);
export const getAttendancesByEmployee = (employeeId) => api.get(`/attendances/employee/${employeeId}`);
export const getAllAttendances = () => api.get('/attendances');

export default api;