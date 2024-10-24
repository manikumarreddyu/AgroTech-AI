import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Profile = () => {
  const [userData, setUserData] = useState(null); 

  useEffect(() => {
    // JWT token contains user information and is stored in local storage
    const token = localStorage.getItem('auth'); 
    if (token) {
      const { userId } = JSON.parse(atob(token.split('.')[1]));

      // Fetch user data from the backend
      axios.get(`http://localhost:8080/api/users/${userId}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setUserData(response.data);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
      });
    }
  }, []);

  return (
    <div className="profile-page max-w-3xl mx-auto mt-16 p-6 bg-white shadow-lg rounded-lg">
      <h1 className="text-3xl font-semibold mb-4 text-center">Your Profile</h1>
      {userData ? ( // Render userData only if it exists
        <div className="space-y-4">
          <div className="flex justify-between">
            <p className="font-bold">First Name:</p>
            <p>{userData.firstName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Last Name:</p>
            <p>{userData.lastName}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Email:</p>
            <p>{userData.email}</p>
          </div>
          <div className="flex justify-between">
            <p className="font-bold">Role:</p>
            <p>{userData.role}</p>
          </div>
        </div>
      ) : (
        <p className="text-center text-gray-600">Loading...</p>
      )}
    </div>
  );
};

export default Profile;
