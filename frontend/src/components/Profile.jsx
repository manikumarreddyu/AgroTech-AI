import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import adminImage from '../assets/agrorent/admin.jpg';
import farmerImage from '../assets/agrorent/farmer.jpg';
import vendorImage from '../assets/agrorent/vendor.jpg';
import customerImage from '../assets/agrorent/customer.jpg';
import heroImage from '../assets/bgHero.png'; 

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '' });
  const [profilePicture, setProfilePicture] = useState(null);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const ApiUrl = process.env.NODE_ENV === 'production'
  ? 'https://agrotech-ai-11j3.onrender.com'
  : 'http://localhost:8080';


  useEffect(() => {
    const token = localStorage.getItem('auth'); 
    if (token) {
      const { userId } = JSON.parse(atob(token.split('.')[1]));
      axios.get(`${ApiUrl}/api/users/${userId}`, { 
        headers: {
          Authorization: `Bearer ${token}`,
        }
      })
      .then(response => {
        setUserData(response.data);
        setFormData({ 
          firstName: response.data.firstName, 
          lastName: response.data.lastName, 
          email: response.data.email 
        });
        setLoading(false);
      })
      .catch(error => {
        console.error("Error fetching user data:", error);
        setError("Failed to load user data.");
        setLoading(false);
      });
    } else {
      setLoading(false);
    }
  }, []);

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = () => {
    const token = localStorage.getItem('auth'); 
    const { userId } = JSON.parse(atob(token.split('.')[1]));

    axios.put(`${ApiUrl}/api/users/${userId}`, formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    })
    .then(response => {
      setUserData(response.data);
      setIsEditing(false);
    })
    .catch(error => {
      console.error("Error updating user data:", error);
      setError("Failed to save changes.");
    });
  };

  // Role-based quotes and images
  const roleDetails = {
    admin: {
      image: adminImage,
      quote: "Empowering the system with efficiency and integrity."
    },
    farmer: {
      image: farmerImage,
      quote: "Cultivating the land, nurturing the future."
    },
    vendor: {
      image: vendorImage,
      quote: "Connecting products to people with passion."
    },
    customer: {
      image: customerImage,
      quote: "A satisfied customer is the best business strategy."
    }
  };

  if (loading) {
    return <p className="text-center text-gray-600">Loading...</p>;
  }

  if (error) {
    return <p className="text-center text-red-600">{error}</p>;
  }

  return (
    <div 
      className="min-h-screen bg-cover bg-center" 
      style={{
        backgroundImage: `url(${heroImage})`
      }}
    >
      <motion.div 
        className="max-w-3xl mx-auto mt-16 p-6 bg-white bg-opacity-90 shadow-lg rounded-lg"
        initial={{ opacity: 0, scale: 0.8 }} // Initial state
        animate={{ opacity: 1, scale: 1 }} // Animation state
        exit={{ opacity: 0, scale: 0.8 }} // Exit animation
        transition={{ duration: 0.5 }} // Animation duration
      >
        <h1 className="text-3xl font-semibold text-center mb-4">Your Profile</h1>

        {/* Row for Edit Profile button */}
        <div className="flex justify-end mb-4">
          <motion.button 
            onClick={handleEditToggle}
            className={`bg-blue-500 text-white p-2 rounded ${isEditing ? 'hidden' : ''}`}
            whileHover={{ scale: 1.05 }} // Hover effect
            whileTap={{ scale: 0.95 }} // Tap effect
          >
            Edit Profile
          </motion.button>
          {isEditing && (
            <motion.button 
              onClick={handleSaveChanges}
              className="bg-blue-500 text-white p-2 rounded ml-2"
              whileHover={{ scale: 1.05 }} // Hover effect
              whileTap={{ scale: 0.95 }} // Tap effect
            >
              Save Changes
            </motion.button>
          )}
        </div>

        {/* Role-based image and quote */}
        {userData && roleDetails[userData.role] && (
          <div className="mt-8 text-center">
            <motion.img 
              src={profilePicture || roleDetails[userData.role].image} 
              alt={userData.role} 
              className="w-64 h-64 mx-auto mb-10 rounded-full" 
              initial={{ opacity: 0 }} // Initial state
              animate={{ opacity: 1 }} // Animation state
              transition={{ duration: 0.5 }} // Animation duration
            />
            <p className="italic text-gray-600">
              "{roleDetails[userData.role].quote}"
            </p>
          </div>
        )}

        {isEditing ? (
          <div className="space-y-4">
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="First Name"
            />
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="Last Name"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="border p-2 w-full"
              placeholder="Email"
            />
          </div>
        ) : (
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
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Profile;
