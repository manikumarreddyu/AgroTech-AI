// ProfileComponent.js
import React, { useState } from 'react';
import AvatarComponent from './Avatar';  // Import the AvatarComponent

const ProfileComponent = ({ profile, handleProfileEdit, updateProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || 'user',
    lastName: profile.lastName || 'user',
    username: profile.username || 'username',
    email: profile.email || 'user@example.com',
    address: profile.address || 'user street address'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    updateProfile(formData);
    setIsEditing(false);  // Stop editing once the form is submitted
  };

  return (
    <div>
      {!isEditing ? (
        <div>
          {/* Displaying the Avatar */}
          <div className="flex items-center mb-4">
            <AvatarComponent 
              profilePicture={profile.profilePicture} 
              name={profile.firstName}  // Ensure profile.firstName exists and is valid
            />
            <div className="ml-4">
              <p className="text-green-700"><strong>Name:</strong> {profile.firstName} {profile.lastName}</p>
              <p className="text-green-700"><strong>Username:</strong> {profile.username}</p>
              <p className="text-green-700"><strong>Email:</strong> {profile.email}</p>
              <p className="text-green-700"><strong>Address:</strong> {profile.address}</p>
            </div>
          </div>
          <button 
            onClick={() => setIsEditing(true)} 
            className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300">
            Edit Profile
          </button>
        </div>
      ) : (
        // Edit Profile Form
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col mb-4">
            <label className="text-green-600">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-green-600">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-green-600">Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-green-600">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex flex-col mb-4">
            <label className="text-green-600">Address</label>
            <textarea 
              name="address" 
              value={formData.address}
              onChange={handleInputChange}
              className="px-4 py-2 border rounded-md"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="submit"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded-md hover:bg-green-500 transition-colors duration-300"
            >
              Save Changes
            </button>
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="inline-block bg-gray-600 text-white px-6 py-2 rounded-md hover:bg-gray-500 transition-colors duration-300"
            >
              Cancel
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default ProfileComponent;
