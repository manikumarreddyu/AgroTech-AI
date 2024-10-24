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
    <div className="profile-page mt-16">
      <h1>Your Profile</h1>
      {userData ? ( // Render userData only if it exists
        <div>
          <p><strong>First Name:</strong> {userData.firstName}</p>
          <p><strong>Last Name:</strong> {userData.lastName}</p>
          <p><strong>Email:</strong> {userData.email}</p>
          <p><strong>Role:</strong> {userData.role}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Profile;
