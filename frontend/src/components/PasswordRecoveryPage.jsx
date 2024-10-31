import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PasswordRecoveryPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("/api/send-otp", { email });
      setMessage(response.data.message);
      navigate("/verify-otp", { state: { email } });
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }
  };

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100'>
      <div className='bg-white p-8 rounded shadow-md w-full max-w-md'>
        <h2 className='text-2xl font-bold mb-6 text-center'>
          Password Recovery
        </h2>
        <form onSubmit={handleSubmit}>
          <div className='mb-4'>
            <label
              className='block text-gray-700 text-sm font-bold mb-2'
              htmlFor='email'
            >
              Email Address
            </label>
            <input
              type='email'
              id='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className='w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
              required
            />
          </div>
          <button
            type='submit'
            className='w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold transform transition duration-300 hover:scale-105'
          >
            Send OTP
          </button>
        </form>
        {message && (
          <p className='mt-4 text-center text-green-500'>{message}</p>
        )}
        <p className='mt-4 text-center'>
          <a href="/login" className='text-blue-500 hover:underline'>
            Back to Login
          </a>
        </p>
      </div>
    </div>
  );
};

export default PasswordRecoveryPage;