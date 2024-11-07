import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import loginImage from "../assets/LoginImage.png";

const AccountVerificationPage = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [loading, setLoading] = useState(true); // To show loading while verifying
  const [error, setError] = useState(null);
  const location = useLocation();

  // Extract the token from the URL query parameters
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");

  useEffect(() => {
    if (token) {
      verifyAccount(token);
    } else {
      setError("Invalid verification link.");
      setLoading(false);
    }
  }, [token]);

  // Function to handle account verification
  const verifyAccount = async (token) => {
  try {
    setLoading(true);
    
    // Send a GET request with the token in the URL
    const response = await axios.get(`https://agro-tech-ai-backend-teal.vercel.app/auth/verify-account?token=${token}`);
    
    if (response.status === 200) {
      toast.success("Account verified successfully. Redirecting to login...");
      setTimeout(() => setIsVerified(true), 2000); // Redirect after a short delay
    } else {
      setError("Verification failed. Please try again.");
    }
  } catch (error) {
    setError(error.response?.data?.message || "Verification failed. Please try again.");
  } finally {
    setLoading(false);
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
            Account Verification
          </h2>

          {loading ? (
            <p className="text-center text-gray-600 mb-8">A</p>
          ) : error ? (
            <p className="text-center text-red-600 mb-8">{error}</p>
          ) : (
            <p className="text-center text-gray-600 mb-8">
              Your account has been verified successfully.
            </p>
          )}

          <p className="text-center text-sm mt-4">
            <a href="/login" className="text-purple-500 hover:underline">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default AccountVerificationPage;
