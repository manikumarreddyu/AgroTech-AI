import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

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

    // Validate inputs before sending
    if (!firstName || !lastName || !email || !password) {
      toast.error("All fields are required.");
      return;
    }

    console.log("SignUp Data: ", {
      firstName,
      lastName,
      email,
      password,
      confirmPassword: password,
    });

    try {
      const response = await axios.post("http://localhost:8080/auth/signup", {
        firstName,
        lastName,
        email,
        password,
        confirmPassword: password,
      });
      toast.success(response.data.message);

      // Redirect to the login page upon successful signup
      navigate("/login");
    } catch (error) {
      console.error("Error response:", error.response); 
      if (error.response) {
        toast.error(error.response.data.message || "Signup failed");
      } else if (error.request) {
        toast.error("No response from server. Please try again later.");
      } else {
        toast.error("Error: " + error.message);
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md flex flex-col items-center">
        <form className="p-6 space-y-4 w-full" onSubmit={handleSignUp}>
          <h2 className="text-2xl font-bold text-center text-green-600">Sign Up</h2>
          <div>
            <label className="block text-sm font-medium text-green-600">First Name</label>
            <input
              type="text"
              placeholder="John"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-600">Last Name</label>
            <input
              type="text"
              placeholder="Doe"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
            />
          </div>
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
              onChange={(e) => validatePassword(e.target.value)}
              className="w-full px-4 py-2 rounded-md bg-green-100 text-green-800 focus:ring focus:ring-green-400"
            />
          </div>

          <div className="space-y-1 text-green-600">
            <div className="flex items-center">
              <input type="checkbox" checked={isLowerUpper} readOnly className="mr-2" />
              <span>Lowercase & Uppercase</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={isNumber} readOnly className="mr-2" />
              <span>Number (0-9)</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={isSpecialChar} readOnly className="mr-2" />
              <span>Special Character (@!#$%^&*)</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" checked={isMinLength} readOnly className="mr-2" />
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
            <a href="/login" className="text-green-500 hover:underline">
              Sign In
            </a>
          </p>
        </form>
      </div>
    </div>
  );
};

export default SignUpPage;
