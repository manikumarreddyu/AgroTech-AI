import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImage from "../assets/LoginImage.png";

const AccountVerificationPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [isVerified, setIsVerified] = useState(false);
  const ApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://agrotech-ai-11j3.onrender.com'
  : 'http://localhost:8080';


  const handleVerifyAccount = async () => {
    try {
      await axios.post(`${ApiUrl}/auth/verify-emailotp`, { email, otp });
      toast.success("Account verified successfully. Redirecting to login...");
      setTimeout(() => setIsVerified(true), 2000); // Redirect after a short delay
    } catch (error) {
      toast.error(error.response?.data?.message || "Verification failed");
    }
  };

  if (isVerified) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-400 to-pink-500 mt-10">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img src={loginImage} alt="Account Verification Illustration" className="h-full w-full object-cover" />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-purple-600 mb-4">
            Verify Your Account
          </h2>
          <p className="text-center text-gray-600 mb-8">
            Enter your email and OTP to verify your account.
          </p>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-purple-600">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-purple-100 text-purple-800 focus:ring focus:ring-purple-400"
              required
            />
          </div>

          <div className="mt-6">
            <label htmlFor="otp" className="block text-sm font-medium text-purple-600">OTP</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 py-2 mt-1 rounded-md bg-purple-100 text-purple-800 focus:ring focus:ring-purple-400"
              required
            />
          </div>

          <button onClick={handleVerifyAccount} className="w-full mt-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-md font-bold">
            Verify Account
          </button>

          <p className="text-center text-sm mt-4">
            <a href="/login" className="text-purple-500 hover:underline">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationPage;
