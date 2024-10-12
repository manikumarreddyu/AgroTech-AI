import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";
import loginImage from "../assets/LoginImage.png"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { isLoggedIn, login } = useAuth(); // Use context

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8080/auth/signin", {
        email,
        password,
      });
      login(response.data.token); // Call login method from context
      toast.success("Login successful");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  // Redirect to home page if logged in
  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-green-400 to-blue-500">
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
              <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold transform transition duration-300 hover:scale-105"
            >
              Sign In
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
