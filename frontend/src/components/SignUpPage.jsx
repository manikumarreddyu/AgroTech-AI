import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import signupImage from "../assets/SignUpImage.png";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";

const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [isLowerUpper, setIsLowerUpper] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const [isSigningUp, setIsSigningUp] = useState(false);

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

    // Additional password validation feedback
    if (!isLowerUpper || !isNumber || !isSpecialChar || !isMinLength) {
      toast.error(
        "Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and be at least 8 characters long."
      );
      return;
    }

    setIsSigningUp(true);
    try {
      const response = await axios.post(
        "https://agro-tech-ai-backend.vercel.app/auth/signup",
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword: password,
        }
      );
      toast.success(response.data.message);
      navigate("/login");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    } finally {
      setIsSigningUp(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-400 to-green-500 mt-10">
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
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 bg-white shadow-lg rounded-lg overflow-hidden transform transition duration-500 ease-in-out hover:scale-105 mt-16">
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
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="password"
                  value={password}
                  onChange={(e) => validatePassword(e.target.value)}
                  className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
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
            {/* Password Validation Checkpoints */}
            <div className="space-y-1 text-green-600">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isLowerUpper}
                  readOnly
                  className="mr-2"
                />
                <span>Lowercase & Uppercase</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isNumber}
                  readOnly
                  className="mr-2"
                />
                <span>Number (0-9)</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isSpecialChar}
                  readOnly
                  className="mr-2"
                />
                <span>Special Character (@!#$%^&*)</span>
              </div>
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={isMinLength}
                  readOnly
                  className="mr-2"
                />
                <span>At least 8 characters</span>
              </div>
            </div>

            <div>
              <button
                type="submit"
                disabled={
                  !isLowerUpper ||
                  !isNumber ||
                  !isSpecialChar ||
                  !isMinLength ||
                  isSigningUp
                }
                className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                {isSigningUp ? "Signing Up..." : "Sign Up"}
              </button>
            </div>
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
