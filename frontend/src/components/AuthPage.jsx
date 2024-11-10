import { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";

const AuthPage = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); 

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
    try {
      const response = await axios.post("https://agrotech-ai-11j3.onrender.com/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password,
      });
      setMessage(response.data.message);
      setIsSignUp(false); 
    } catch (error) {
      setMessage(error.response?.data?.message || "Signup failed");
    }
  };

  const handleSignIn = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("https://agrotech-ai-11j3.onrender.com/auth/signin", {
        email,
        password,
      });
      setMessage(response.data.message);
      setIsLoggedIn(true);
    } catch (error) {
      setMessage(error.response?.data?.message || "Login failed");
    }
  };

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col items-center">
        <div className="w-full flex justify-center py-4 bg-green-100 rounded-t-lg">
          <button
            onClick={() => setIsSignUp(false)}
            className={`w-1/2 py-2 font-bold ${
              !isSignUp
                ? "bg-green-500 text-white"
                : "bg-transparent text-green-500"
            } rounded-l-lg`}
          >
            Sign In
          </button>
          <button
            onClick={() => setIsSignUp(true)}
            className={`w-1/2 py-2 font-bold ${
              isSignUp
                ? "bg-green-500 text-white"
                : "bg-transparent text-green-500"
            } rounded-r-lg`}
          >
            Sign Up
          </button>
        </div>

        {message && (
          <div className="text-red-500 text-center p-2">{message}</div>
        )}

        {!isSignUp && (
          <form className="p-6 space-y-4 w-full" onSubmit={handleSignIn}>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Sign In
            </h2>
            <div>
              <label className="block text-sm font-medium text-green-600">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-600">
                Password
              </label>
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
              <a
                href="#"
                onClick={() => setIsSignUp(true)}
                className="text-green-500 hover:underline"
              >
                Sign Up
              </a>
            </p>
          </form>
        )}

        {isSignUp && (
          <form className="p-6 space-y-4 w-full" onSubmit={handleSignUp}>
            <h2 className="text-2xl font-bold text-center text-green-600">
              Sign Up
            </h2>
            <div>
              <label className="block text-sm font-medium text-green-600">
                First Name
              </label>
              <input
                type="text"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-600">
                Last Name
              </label>
              <input
                type="text"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-600">
                Email
              </label>
              <input
                type="email"
                placeholder="john@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-green-600">
                Password
              </label>
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) => validatePassword(e.target.value)}
                className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
              />
            </div>

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
                className="w-full py-2 bg-green-500 hover:bg-green-600 text-white rounded-md font-bold disabled:bg-gray-400 disabled:cursor-not-allowed"
              >
                Sign Up
              </button>
            </div>
            <p className="text-center text-sm">
              Already have an account?{" "}
              <a
                href="#"
                onClick={() => setIsSignUp(false)}
                className="text-green-500 hover:underline"
              >
                Sign In
              </a>
            </p>
          </form>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
