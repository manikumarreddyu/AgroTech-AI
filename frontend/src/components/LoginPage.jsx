import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../context/AuthContext";

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
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col items-center">
        <form className="p-6 space-y-4 w-full" onSubmit={handleSignIn}>
          <h2 className="text-2xl font-bold text-center text-green-600">Sign In</h2>
          <div>
            <label className="block text-sm font-medium text-green-600">Email</label>
            <input
              type="email"
              placeholder="john@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-600">Password</label>
            <input
              type="password"
              placeholder="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-bold"
            >
              Sign In
            </button>
          </div>
          <p className="text-center text-sm">
            Don’t have an account?{" "}
            <a href="/signup" className="text-green-500 hover:underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
