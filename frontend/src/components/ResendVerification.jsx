import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import resendImage from "../assets/LoginImage.png";

const ResendVerificationPage = () => {
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(null);
    const [timeRemaining, setTimeRemaining] = useState(180); // Initial countdown timer (20 seconds for testing, reset to 180 later)
    const [canResend, setCanResend] = useState(false);
    const location = useLocation();
  
    // Extract the email from URL query parameters
    const queryParams = new URLSearchParams(location.search);
    const email = queryParams.get("email");
  
    const ApiUrl =
      process.env.NODE_ENV === "production"
        ? "https://agro-tech-ai-backend-teal.vercel.app"
        : "http://localhost:8080";
  
    useEffect(() => {
      if (!email) {
        setError("Invalid request. No email provided.");
      }
  
      // Start the countdown timer when the component mounts
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(timer);
            setCanResend(true); // Enable resend button when timer reaches zero
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
  
      return () => clearInterval(timer); // Cleanup interval when component unmounts
    }, [email]); // This effect runs once when the component mounts
  
    const resendVerificationEmail = async () => {
      setLoading(true);
      setError(null);
      setSuccess(false);
      console.log(email);
  
      try {
        const response = await axios.post(`${ApiUrl}/auth/resend-verify-email`, {
          email: email,
        });
  
        if (response.status === 200) {
          toast.success("Verification email sent successfully.");
          setSuccess(true);
          setCanResend(false); // Disable resend button again
          setTimeRemaining(180); // Reset timer to 3 minutes after successful resend
  
          // Restart the countdown timer after resetting timeRemaining
          const timer = setInterval(() => {
            setTimeRemaining((prevTime) => {
              if (prevTime <= 1) {
                clearInterval(timer);
                setCanResend(true); // Enable resend button when timer reaches zero
                return 0;
              }
              return prevTime - 1;
            });
          }, 1000);
  
          // Cleanup the interval when the component unmounts or timer resets
          return () => clearInterval(timer);
        } else {
          setError("Failed to resend verification email. Please try again.");
        }
      } catch (error) {
        setError(
          error.response?.data?.message || "Failed to resend verification email."
        );
      } finally {
        setLoading(false);
      }
    };
  
    const formattedTime = `${Math.floor(timeRemaining / 60)}:${String(
      timeRemaining % 60
    ).padStart(2, "0")}`;
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 mt-10">
      <ToastContainer position="top-center" autoClose={5000} hideProgressBar newestOnTop />
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="hidden md:block">
          <img src={resendImage} alt="Resend Verification Illustration" className="h-full w-full object-cover" />
        </div>

        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-4">
            Verify Your Email
          </h2>

          <p className="text-center text-gray-600 mb-8">
            A verification email has been sent to <strong>{email}</strong>. Please check your inbox.
          </p>

          {error && <p className="text-center text-red-600 mb-4">{error}</p>}
          {success && (
            <p className="text-center text-green-600 mb-4">
              Verification email sent! Please check your inbox.
            </p>
          )}

          <button
            className={`w-full px-4 py-2 mt-6 rounded ${
              canResend ? "bg-blue-500" : "bg-gray-300 cursor-not-allowed"
            } text-white font-bold`}
            onClick={resendVerificationEmail}
            disabled={!canResend || loading}
          >
            {loading ? "Sending..." : "Resend Verification Email"}
          </button>

          {!canResend && (
            <p className="text-center text-gray-600 mt-4">
              Please wait {formattedTime} before requesting again.
            </p>
          )}

          <p className="text-center text-sm mt-4">
            <a href="/login" className="text-blue-500 hover:underline">Back to Login</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResendVerificationPage;
