import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { Toaster, toast } from 'react-hot-toast';

function Login() {
  const navigate = useNavigate();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/user/login`, formData);
      console.log(response.data); // Log response for debugging
      const { message, user, token } = response.data;
      
      // Save token to local storage
      localStorage.setItem('token', token);
      localStorage.setItem('role',user?.role);

      // Show success toast and navigate to products page
      toast.success('Login Successful!');
      console.log('message', message, 'user', user, 'token', token);
      navigate('/products');
    } catch (error) {
      // Show error toast if login fails
      toast.error(error.response?.data?.message || 'Login failed!');
      console.error('Login failed:', error.response?.data);
    }
  };

  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      <Navbar />
      <div className='flex justify-around mt-[64px] p-10 '>
        <div className='w-1/4 flex-col p-4 pt-40 rounded-lg'>
          {/* Toaster for notifications */}
          <Toaster position="top-center" reverseOrder={false} />
          
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <label htmlFor="email" className="text-md mb-[-10px]">Email:</label>
            <TextField id="email" name='email' label="Email" variant="standard" value={formData.email} onChange={handleChange} />
            <label htmlFor="password" className="text-md mb-[-10px]">Password:</label>
            <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" variant='standard' value={formData.password} onChange={handleChange} />
            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Submit</button>
          </form>
        </div>

        {/* Big Image */}
        <div className='w-1/3 flex-col p-4 rounded-lg '>
          <img src="../src/assets/hero.png" alt="Big Image" className="w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
}

export default Login;
