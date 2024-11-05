import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImage from "../assets/LoginImage.png";

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [step, setStep] = useState(1); 

  const handleSendOtp = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/forgot-password", { email });
      toast.success("OTP sent to your email address");
      setStep(2); // Move to OTP verification step
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to send OTP");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/verify-otp", { email, otp });
      toast.success("OTP verified. Enter your new password.");
      setStep(3); // Move to password reset step
    } catch (error) {
      toast.error(error.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResetPassword = async () => {
    try {
      await axios.post("https://agrotech-ai-11j3.onrender.com/auth/reset-password", { email, otp, newPassword });
      toast.success("Password reset successfully. Please log in.");
      setTimeout(() => {
        <Navigate to="/login" replace />;
      }, 2000);
    } catch (error) {
      toast.error(error.response?.data?.message || "Password reset failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 mt-10">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img src={loginImage} alt="Forgot Password Illustration" className="h-full w-full object-cover" />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-4">
            Forgot Password
          </h2>
          <p className="text-center text-gray-600 mb-8">
            {step === 1 && "Enter your email to receive an OTP"}
            {step === 2 && "Enter the OTP sent to your email"}
            {step === 3 && "Reset your password"}
          </p>

          {step === 1 && (
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-green-600">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleSendOtp} className="w-full mt-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md font-bold">
                Send OTP
              </button>
            </div>
          )}

          {step === 2 && (
            <div>
              <label htmlFor="otp" className="block text-sm font-medium text-green-600">OTP</label>
              <input
                type="text"
                id="otp"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleVerifyOtp} className="w-full mt-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md font-bold">
                Verify OTP
              </button>
            </div>
          )}

          {step === 3 && (
            <div>
              <label htmlFor="newPassword" className="block text-sm font-medium text-green-600">New Password</label>
              <input
                type="password"
                id="newPassword"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                required
              />
              <button onClick={handleResetPassword} className="w-full mt-4 py-2 bg-gradient-to-r from-green-500 to-blue-500 text-white rounded-md font-bold">
                Reset Password
              </button>
            </div>
          )}

          <p className="text-center text-sm mt-4">
            <a href="/login" className="text-green-500 hover:underline">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
