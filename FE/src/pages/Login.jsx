// LoginForm.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:5000/api/investigators/login', { email, password });
      localStorage.setItem('token', response.data.token);
      
      navigate('/athlete-list');
    } catch (err) {
      setError(err.response?.data?.error || 'An error occurred. Please try again.');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#ADBC9F]">
      <div className="bg-[#12372A] text-white p-2 pt-4 rounded-lg shadow-lg w-96 mb-4">
        <h2 className="text-2xl font-bold mb-4 text-center">Investigator Login</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Email:</label>
            <input 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-1">Password:</label>
            <input 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              className="w-full p-2 border border-gray-300 rounded"
            />
          </div>
          {error && <p className="text-red-500 mb-4">{error}</p>}
          <button 
            type="submit" 
            className="w-full bg-[#12372A] text-white p-2 rounded hover:bg-[#2a7a5e]"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
