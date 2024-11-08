import React, { useState, useEffect } from 'react';
import AvatarComponent from './Avatar';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProfileComponent = ({ profile, setProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: profile.firstName || '',
    lastName: profile.lastName || '',
    username: profile.username || '',
    email: profile.email || '',
    address: profile.address || '',
  });
  const [errors, setErrors] = useState({});

  const ApiUrl = process.env.NODE_ENV === 'production'
    ? 'https://agrotech-ai-11j3.onrender.com'
    : 'http://localhost:8080';

  // Update formData when profile prop changes
  useEffect(() => {
    setFormData({
      firstName: profile.firstName || '',
      lastName: profile.lastName || '',
      username: profile.username || '',
      email: profile.email || '',
      address: profile.address || '',
    });
  }, [profile]);


  const validateInput = () => {
    let validationErrors = {};
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

    if (formData.firstName.length < 2) validationErrors.firstName = "First name must be at least 2 characters.";
    if (formData.lastName.length < 2) validationErrors.lastName = "Last name must be at least 2 characters.";
    if (formData.username.length < 3 || formData.username.length > 30) validationErrors.username = "Username must be between 3 and 30 characters.";
    if (!emailRegex.test(formData.email)) validationErrors.email = "Invalid email format.";

    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 const handleToggleEdit = () => {
    setIsEditing(!isEditing);
    if (!isEditing) setFormData({...profile }); // Reset form data to original profile when editing is cancelled
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateInput()) {
      toast.error('Please fix validation errors.');
      return;
    }

    try {
      const response = await fetch(`${ApiUrl}/auth/profile-update?userId=${profile.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to update profile');
      }

      const updatedUser = await response.json();
      setProfile(updatedUser); // Update the profile in parent component
      toast.success('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      toast.error(error.message || 'Error updating profile. Please try again.');
    }
  };

  return (
    <div>
      <ToastContainer />

      {!isEditing ? (
        <div>
          <div className="flex items-center mb-4">
            <AvatarComponent profilePicture={profile.profilePicture} name={profile.firstName} />
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
        <form onSubmit={handleSubmit} className="mt-6">
          <div className="flex flex-col mb-4">
            <label className="text-green-600">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              value={formData.firstName}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md ${errors.firstName ? 'border-red-500' : ''}`}
            />
            {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-green-600">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              value={formData.lastName}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md ${errors.lastName ? 'border-red-500' : ''}`}
            />
            {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-green-600">Username</label>
            <input 
              type="text" 
              name="username" 
              value={formData.username}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md ${errors.username ? 'border-red-500' : ''}`}
            />
            {errors.username && <p className="text-red-500 text-sm">{errors.username}</p>}
          </div>

          <div className="flex flex-col mb-4">
            <label className="text-green-600">Email</label>
            <input 
              type="email" 
              name="email" 
              value={formData.email}
              onChange={handleInputChange}
              className={`px-4 py-2 border rounded-md ${errors.email ? 'border-red-500' : ''}`}
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
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
