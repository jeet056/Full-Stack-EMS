import React, { useState, useContext } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { AuthContext } from '../AuthContext';

const Login = () => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const handleGoogleLogin = async () => {
    setError('');
    setIsLoading(true);

    try {
      // Redirect to backend's OAuth2 login endpoint
      window.location.href = 'http://localhost:8080/oauth2/authorization/google';
    } catch (error) {
      console.error('OAuth2 login failed', error);
      setError('Failed to initiate Google login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-blue p-6 rounded shadow-md w-96">
        <h2 className="text-2xl mb-4">Login</h2>

        {error && <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">{error}</div>}

        <button
          onClick={handleGoogleLogin}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600 mb-4"
          disabled={isLoading}
        >
          {isLoading ? 'Redirecting...' : 'Login with Google'}
        </button>

        <div className="text-center">
          Don't have an account? <Link to="/register" className="text-blue-500 hover:underline">Create one</Link>
        </div>
      </div>
    </div>
  );
};

export default Login;