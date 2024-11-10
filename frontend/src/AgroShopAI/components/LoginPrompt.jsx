import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPrompt = ({message}) => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        navigate('/login'); // Adjust the path as per your routing setup
    };

    return (
        <div className="bg-gray-800 font-sans min-h-screen flex flex-col items-center justify-center">
            <p className="text-green-500 text-2xl font-semibold mb-4">
                {message}
            </p>
            <button
                onClick={handleRedirect}
                className="bg-green-500 hover:bg-green-600 text-white py-2 px-6 rounded-lg transition duration-300"
            >
                Go to Login
            </button>
        </div>
    );
};

export default LoginPrompt;
