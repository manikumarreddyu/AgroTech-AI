import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assets/LoginImage.png";
<<<<<<< HEAD
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";
=======
>>>>>>> 742f485 (add button loading login signin)

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSigningIn, setIsSigningIn] = useState(false);
  const { isLoggedIn, login } = useAuth(); // Use context

  const handleSignIn = async (e) => {
    e.preventDefault();
    setIsSigningIn(true);
    try {
      const response = await axios.post(
        "https://agro-tech-ai-backend.vercel.app/auth/signin",
        {
          email,
          password,
        }
      );
      login(response.data.token); // Call login method from context
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setIsSigningIn(false);
    }
  };

  // Redirect to home page if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500 mt-10">
      {/* Toast Container */}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        toastClassName="custom-toast"
        bodyClassName="custom-toast-body"
        className="mt-16"
      />
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
        {/* Image section */}
        <div className="hidden md:block">
          <img
            src={loginImage}
            alt="Login Illustration"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Form section */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-green-600 mb-4 animate-fadeInDown">
            Welcome Back!
          </h2>
          <p className="text-center text-gray-600 mb-8 animate-fadeInDown">
            Log in to continue to your account
          </p>
          <form className="space-y-4" onSubmit={handleSignIn}>
            <div className="animate-slideInLeft">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-green-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                required
              />
            </div>
            <div className="animate-slideInRight">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-green-600"
              >
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-3 text-green-800"
                >
                  <img
                    src={showPassword ? eyeSlashIcon : eyeIcon}
                    alt="Show/Hide"
                    className="w-5 h-6"
                  />
                </button>
              </div>
            </div>
            <button
              type="submit"
              disabled={isSigningIn}
              className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold transform transition duration-300 hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isSigningIn ? "Signing In..." : "Sign In"}
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 hover:underline">
              Sign Up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
