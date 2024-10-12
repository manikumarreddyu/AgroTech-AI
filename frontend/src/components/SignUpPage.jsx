import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import signupImage from "../assets/SignUpImage.png";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [isLowerUpper, setIsLowerUpper] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);

  const validatePassword = (input) => {
    setPassword(input);

    const lowerUpper = /^(?=.*[a-z])(?=.*[A-Z])/;
    setIsLowerUpper(lowerUpper.test(input));

    const numberCheck = /^(?=.*[0-9])/;
    setIsNumber(numberCheck.test(input));

    const specialCharCheck = /^(?=.*[!@#$%^&*])/;
    setIsSpecialChar(specialCharCheck.test(input));

    setIsMinLength(input.length >= 8);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password,
      });
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-500">
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105">
        
        {/* Form section */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-4xl font-bold text-center text-blue-600 mb-4 animate-fadeInDown">
            Join Us Today!
          </h2>
          <p className="text-center text-gray-600 mb-8 animate-fadeInDown">
            Create your account to get started
          </p>
          <form className="space-y-4" onSubmit={handleSignUp}>
            <div className="animate-slideInLeft">
              <label
                htmlFor="firstName"
                className="block text-sm font-medium text-blue-600"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div className="animate-slideInRight">
              <label
                htmlFor="lastName"
                className="block text-sm font-medium text-blue-600"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div className="animate-slideInLeft">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-blue-600"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <div className="animate-slideInRight">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-blue-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-2 bg-gradient-to-r from-blue-500 to-green-500 hover:from-green-500 hover:to-blue-500 text-white rounded-md font-bold transform transition duration-300 hover:scale-105"
            >
              Sign Up
            </button>
          </form>
          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:underline">
              Log In
            </a>
          </p>
        </div>

        {/* Image section */}
        <div className="hidden md:block">
          <img
            src={signupImage}
            alt="Signup Illustration"
            className="h-full w-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
