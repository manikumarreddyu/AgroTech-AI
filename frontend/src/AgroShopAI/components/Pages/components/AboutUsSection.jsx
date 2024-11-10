import React from 'react';

export default function AboutUsSection({ sellerData, editMode, handleEdit, handleSave, handleChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-green-700 mb-4">About Us</h2>
      {editMode.about ? (
        <div>
          <textarea
            name="about"
            className="w-full p-2 border border-gray-300 rounded"
            rows={5}
            value={sellerData.about}
            onChange={handleChange}
          />
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => handleSave('about')}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700">{sellerData.about}</p>
          <button
            className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
            onClick={() => handleEdit('about')}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
