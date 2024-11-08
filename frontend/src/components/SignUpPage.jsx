import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import signupImage from "../assets/SignUpImage.png";
import eyeIcon from "../assets/icons/eye.svg";
import eyeSlashIcon from "../assets/icons/eye-slash.svg";
import googleIcon from "../assets/icons/icons8-google.svg"; // Google icon for the button
const SignUpPage = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isLowerUpper, setIsLowerUpper] = useState(false);
  const [isNumber, setIsNumber] = useState(false);
  const [isSpecialChar, setIsSpecialChar] = useState(false);
  const [isMinLength, setIsMinLength] = useState(false);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [emailMessage, setEmailMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);

    // Clear previous timeout if any
    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    // Set a new timeout to trigger the username availability check after 500ms
    setTypingTimeout(setTimeout(() => {
      if (e.target.value.length > 2) {
        checkUsernameAvailability(e.target.value);
      } else {
        setMessage('Username must be at least 3 characters');
      }
    }, 500)); // 500ms delay
  };

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
  const handleEmailBlur = () => {
    // Regular expression to validate email format
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    // First, check if the email format is valid
    if (!emailRegex.test(email)) {
      setEmailMessage('Please enter a valid email address');
      return; // Stop further execution if email is invalid
    }
  
    // Then check if the email is long enough
    if (email.length < 6) {
      setEmailMessage('Email must be at least 6 characters');
      return;
    }
  
    // If both checks pass, proceed to check email availability
    checkEmailAvailability(email);
  };
  
  const checkUsernameAvailability = async (username) => {
    setIsChecking(true); // Disable the input field
  
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/check-username/${username}`, {
        method: 'GET', // Change to GET request
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      const data = await response.json();
  
      if (response.status === 200) {
        setMessage('Username is available');
      } else {
        setMessage(data.message); // 'Username is already taken'
      }
    } catch (error) {
      setMessage('Error checking username');
    } finally {
      setIsChecking(false); // Enable input field after check
    }
  };
  


  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !username) {
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
    setIsSubmitting(true);
    try {
      const response = await axios.post(
        `${ApiUrl}/auth/signup`,
        {
          firstName,
          lastName,
          username,
          email,
          password,
        }
      );
      toast.info("Please check your email to verify your account.");
      setFirstName("");
      setLastName("");
      setUsername("");
      setEmail("");
      setPassword("");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Signup failed. Please try again."
      );
    }
    finally{
      setIsSubmitting(false);
    }
  };
  const checkEmailAvailability = async (email) => {
    setIsChecking(true); // Disable the input field
    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}auth/check-email/${email}`, {
        method: 'GET', // Change to GET request
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const data = await response.json();

      if (response.status === 200) {
        setEmailMessage('Email is available');
      } else {
        setEmailMessage(data.message); // 'Email is already taken'
      }
    } catch (error) {
      setEmailMessage('Error checking email');
    } finally {
      setIsChecking(false); // Enable input field after check
    }
  };
  const handleGoogleSignIn = () => {
    window.location.href = `${ApiUrl}/auth/google`;
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
            <div className="flex">

            <div className="animate-slideInLeft mr-2">
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
                disabled={isSubmitting}
              />
            </div>
            <div className="animate-slideInRight ml-2">
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
                disabled={isSubmitting}
              />
            </div>
            </div>
            <div className="animate-slideInRight">
              <label
                htmlFor="Username"
                className="block text-sm font-medium text-blue-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={handleUsernameChange}
                placeholder="Enter username"
                disabled={isChecking || isSubmitting}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
              />
              {isChecking ? (
                <p className="text-blue-500 mt-2">Checking availability...</p>
              ) : (
                <p
                  className={`mt-2 text-sm ${
                    message.includes('available')
                      ? "text-green-600"
                      : message.includes('taken') || message.includes('Error')
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {message}
                </p>
              )}
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
                onBlur={handleEmailBlur}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 mt-1 rounded-md bg-blue-100 text-blue-800 focus:ring focus:ring-blue-400"
                required
                disabled={isSubmitting}
              />
              {isChecking ? (
                <p className="text-blue-500 mt-2">Checking availability...</p>
              ) : (
                <p
                  className={`mt-2 text-sm ${
                    emailMessage.includes('available')
                      ? "text-green-600"
                      : emailMessage.includes('taken') || emailMessage.includes('Error')
                      ? "text-red-600"
                      : "text-gray-600"
                  }`}
                >
                  {emailMessage}
                </p>
              )}
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
                  disabled={isSubmitting}
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
                  !isLowerUpper || !isNumber || !isSpecialChar || !isMinLength
                }
                className="w-full py-2 bg-gradient-to-r from-green-500 to-blue-500 hover:from-blue-500 hover:to-green-500 text-white rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
             

            </div>
            <button
            onClick={handleGoogleSignIn}
            className="w-full mt-4 py-2 flex items-center justify-center bg-white text-gray-700 border border-gray-300 rounded-md font-bold transform transition duration-300 hover:scale-105"
          >
            <img src={googleIcon} alt="Google" className="w-6 h-6 mr-2" />
            Sign in with Google
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
      {isSubmitting && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white p-6 rounded-lg shadow-lg w-96">
          <div className="flex justify-center items-center space-x-2">
            <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" role="status"></div>
            <p className="text-lg font-semibold text-gray-800">Processing Sign-Up... Please Wait</p>
          </div>
        </div>
      </div>
      )}
    </div>
  );
};

export default SignUpPage;
