import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { TextField, MenuItem, Select, InputLabel, FormControl } from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';

function Register() {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const navigate = useNavigate();
  const [isRegistered, setIsRegistered] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    age: '',
    role: '', // Default role
    address: '',
    city: '',
    state: '',
    zipCode: '',
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
      console.log(formData);
      const response = await axios.post(`${BASE_URL}/api/user/`, formData);
      console.log(response.data); // Log response for debugging
      toast.success('Successfully Registered!');
      setIsRegistered(true);
    } catch (error) {
      console.error('Registration failed:', error.response.data);
      toast.error('Registration failed!!');
    }
  };

  return (
    <div className='w-full h-screen bg-[#f7f7f8]' style={{ fontFamily: "'Exo 2', sans-serif" }}>
      {/* navbar------------------------ */}
      <div className='p-2 px-8 w-full h-16 flex items-center bg-[#f7f7f8b8] fixed top-0 z-10 font-semibold'>
        <div className='flex align-center items-center justify-start gap-2 w-1/3'>
          <Link to="/products">
            <img src="../src/assets/Logo2.png" alt="" className='rounded-full' width={"50px"} />
          </Link>
          <h2 className='text-2xl text-zinc-800 font-bold'>AgroRent</h2>
        </div>
      </div>

      {/* form------------------- */}
      <div className='flex justify-around mt-[64px] p-10 '>
        <div className='w-1/4 flex-col p-4 rounded-lg'>
          {/* Form */}
          <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
            <Toaster position="top-center" reverseOrder={false} />

            <label htmlFor="name" className="text-md mb-[-10px] ">Name:</label>
            <TextField id="name" name='name' label="Name" variant="standard" value={formData.name} onChange={handleChange} />
            
            <label htmlFor="email" className="text-md mb-[-10px] ">Email:</label>
            <TextField id="email" name='email' label="Email" variant="standard" value={formData.email} onChange={handleChange} />
            
            <label htmlFor="password" className="text-md mb-[-10px] ">Password:</label>
            <TextField id="password" name="password" label="Password" type="password" autoComplete="current-password" variant='standard' value={formData.password} onChange={handleChange} />

            <label htmlFor="age" className="text-md mb-[-10px] ">Age:</label>
            <TextField id="age" name='age' label="Age" variant="standard" value={formData.age} onChange={handleChange} />

            <label htmlFor="address" className="text-md mb-[-10px] ">Address:</label>
            <TextField id="address" name='address' label="Address" variant="standard" value={formData.address} onChange={handleChange} />

            <label htmlFor="city" className="text-md mb-[-10px] ">City:</label>
            <TextField id="city" name='city' label="City" variant="standard" value={formData.city} onChange={handleChange} />

            <label htmlFor="state" className="text-md mb-[-10px] ">State:</label>
            <TextField id="state" name='state' label="State" variant="standard" value={formData.state} onChange={handleChange} />

            <label htmlFor="zipCode" className="text-md mb-[-10px] ">Zip Code:</label>
            <TextField id="zipCode" name='zipCode' label="Zip Code" variant="standard" value={formData.zipCode} onChange={handleChange} />

            <FormControl variant="standard">
              <InputLabel htmlFor="role">Role</InputLabel>
              <Select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              >
                <MenuItem value="farmer">Farmer</MenuItem>
                <MenuItem value="owner">Owner</MenuItem>
              </Select>
            </FormControl>

            <button type="submit" className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Register</button>
          </form>
        </div>

        {/* Big Image */}
        <div className='w-1/3 flex-col p-4 rounded-lg '>
          <img src="../src/assets/hero.png" alt="Big Image" className="w-full rounded-lg" />
          {isRegistered ? <button onClick={() => navigate('/login')} className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">Login</button> : null}
        </div>
      </div>
    </div>
  );
}

export default Register;
