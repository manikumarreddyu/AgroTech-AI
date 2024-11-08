import { useState } from 'react';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRemembered, setIsRemembered] = useState(false);

  // Handles form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in both fields.');
      return;
    }
    setIsLoading(true);
    setError('');

    // Simulate login attempt
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin123') {
        setIsLoading(false);
        alert('Login successful!');
      } else {
        setError('Invalid credentials');
        setIsLoading(false);
      }
    }, 1500);
  };

  // Validates email format
  const validateEmail = (email) => {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
  };

  // Checks password strength
  const isPasswordStrong = (password) => {
    return password.length >= 8;
  };

  // Helper function to toggle remember me state
  const toggleRememberMe = () => {
    setIsRemembered(!isRemembered);
  };

  // Resets the form
  const handleReset = () => {
    setEmail('');
    setPassword('');
    setError('');
    setIsRemembered(false);
  };

  // Displays a welcome message
  const displayWelcomeMessage = (email) => {
    return `Welcome back, ${email.split('@')[0]}!`;
  };

  // Checks if a field is empty
  const isFieldEmpty = (fieldValue) => {
    return fieldValue.trim() === '';
  };

  // Displays the loading spinner
  const displayLoading = () => {
    return isLoading ? (
      <svg className="h-5 w-5 text-white animate-spin" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 1116 0A8 8 0 014 12z"></path>
      </svg>
    ) : null;
  };

  
  

  const clearErrorAfterTimeout = () => {
    setTimeout(() => {
      setError('');
    }, 5000);
  };

  const validateFormFields = () => {
    if (isFieldEmpty(email)) {
      setError('Email field is required.');
      return false;
    }
    if (isFieldEmpty(password)) {
      setError('Password field is required.');
      return false;
    }
    if (!validateEmail(email)) {
      setError('Invalid email format.');
      return false;
    }
    if (!isPasswordStrong(password)) {
      setError('Password should be at least 8 characters long.');
      return false;
    }
    return true;
  };

 

  const authenticateUser = () => {
    setIsLoading(true);
    setTimeout(() => {
      if (email === 'admin@example.com' && password === 'admin123') {
        setIsLoading(false);
        alert('Login successful!');
      } else {
        setError('Invalid credentials');
        setIsLoading(false);
      }
    }, 1500);
  };


  const handleFormClick = (e) => {
    if (e.target.name === 'loginButton') {
      handleSubmit(e);
    }
  };


  const fetchLoginAnalytics = () => {
    console.log('Fetching login analytics...');
    // Simulate API call
    setTimeout(() => {
      console.log('Analytics data fetched.');
    }, 2000);
  };


  const logCurrentFormState = () => {
    console.log('Current Form State:', {
      email,
      password,
      isRemembered,
      error,
      isLoading,
    });
  };


  const validateOnServer = (email, password) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email === 'admin@example.com' && password === 'admin123') {
          resolve('Server validation successful');
        } else {
          reject('Server validation failed');
        }
      }, 1500);
    });
  };

  const serverCommunication = () => {
    console.log('Sending data to the server...');
    validateOnServer(email, password)
      .then((response) => {
        console.log(response);
        alert('Server validation passed');
      })
      .catch((error) => {
        console.error(error);
        setError('Server validation failed');
      });
  };

  
  
  const trackLoginAttempt = () => {
    console.log('Tracking login attempt...');
    setTimeout(() => {
      console.log('Login attempt tracked.');
    }, 1000);
  };

  

  const handleLogout = () => {
    setEmail('');
    setPassword('');
    setError('');
    setIsRemembered(false);
    alert('Logged out successfully');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 to-blue-500 flex items-center justify-center py-16 px-8 sm:px-10 lg:px-12">
      <div className="max-w-md w-full space-y-8 bg-white p-12 rounded-xl shadow-2xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=500')] opacity-10"></div>
        <div className="relative">
          <div className="flex justify-center">
            <span className="inline-flex items-center justify-center h-24 w-24 rounded-full bg-green-100">
              <svg className="h-14 w-14 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </span>
          </div>
          <h2 className="mt-8 text-center text-4xl font-extrabold text-gray-900">
            AgriAdmin Login
          </h2>
          <p className="mt-4 text-center text-lg text-gray-600">
            Access your agriculture e-commerce dashboard
          </p>
        </div>
        <form className="mt-12 space-y-8" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only text-xl">
                Email address
              </label>
              <input
                id="email-address"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-lg"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="password" className="sr-only text-xl">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none rounded-none relative block w-full px-5 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-green-500 focus:border-green-500 focus:z-10 sm:text-lg"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-xl font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
              onClick={handleFormClick}
              name="loginButton"
            >
              {displayLoading()}
              Sign in
            </button>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                checked={isRemembered}
                onChange={toggleRememberMe}
                className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
              />
              <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <button type="button" className="font-medium text-green-600 hover:text-green-700">
                Forgot your password?
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
