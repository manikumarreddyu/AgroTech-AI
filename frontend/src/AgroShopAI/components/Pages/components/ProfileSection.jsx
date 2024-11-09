import React from 'react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

export default function ProfileSection({ sellerData, editMode, handleEdit, handleSave, handleChange, handleFileChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="mb-6 text-center">
        <img
          src={sellerData.profilePicture}
          alt={sellerData.businessName}
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
        />
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          id="profile-picture-upload"
        />
        <label
          htmlFor="profile-picture-upload"
          className="cursor-pointer bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
        >
          Change Picture
        </label>
      </div>
      {editMode.info ? (
        <div className="space-y-4">
          <input
            type="text"
            name="businessName"
            value={sellerData.businessName}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Business Name"
          />
          <input
            type="text"
            name="tagline"
            value={sellerData.tagline}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Tagline"
          />
          <select
            name="sellerType"
            value={sellerData.sellerType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="Individual">Individual</option>
            <option value="Business">Business</option>
          </select>
          <input
            type="text"
            name="location"
            value={sellerData.location}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Location"
          />
          <input
            type="email"
            name="email"
            value={sellerData.email}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Email"
          />
          <input
            type="tel"
            name="phone"
            value={sellerData.phone}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Phone"
          />
          <input
            type="text"
            name="customerService"
            value={sellerData.customerService}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            placeholder="Customer Service Hours"
          />
          <button
            className="w-full px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => handleSave('info')}
          >
            Save
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-green-700">{sellerData.businessName}</h2>
          <p className="text-gray-600 italic">{sellerData.tagline}</p>
          <p><strong>Type:</strong> {sellerData.sellerType}</p>
          <p><strong>Location:</strong> {sellerData.location}</p>
          <p><strong>Email:</strong> {sellerData.email}</p>
          <p><strong>Phone:</strong> {sellerData.phone}</p>
          <p><strong>Customer Service:</strong> {sellerData.customerService}</p>
          <div className="flex justify-center space-x-4 mt-4">
            <a href={sellerData.socialMedia.facebook} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800">
              <Facebook size={24} />
            </a>
            <a href={sellerData.socialMedia.instagram} target="_blank" rel="noopener noreferrer" className="text-pink-600 hover:text-pink-800">
              <Instagram size={24} />
            </a>
            <a href={sellerData.socialMedia.twitter} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-600">
              <Twitter size={24} />
            </a>
          </div>
          <button
            className="w-full mt-4 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
            onClick={() => handleEdit('info')}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
