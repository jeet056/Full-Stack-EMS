import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
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
export const getAllPayrolls = () => api.get('/payrolls'); // New function

export const createAttendance = (attendance) => api.post('/attendances', attendance);
export const getAttendancesByEmployee = (employeeId) => api.get(`/attendances/employee/${employeeId}`);
export const getAllAttendances = () => api.get('/attendances');

export default api;