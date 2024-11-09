import React from 'react';

export default function PolicySection({ policy, sellerData, editMode, handleEdit, handleSave, handlePolicyChange }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-medium text-green-600 mb-2 capitalize">{policy}</h3>
      {editMode[policy] ? (
        <div>
          <textarea
            className="w-full p-2 border border-gray-300 rounded"
            rows={6}
            value={sellerData.policies[policy]}
            onChange={(e) => handlePolicyChange(e, policy)}
          />
          <button
            className="mt-2 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
            onClick={() => handleSave(policy)}
          >
            Save
          </button>
        </div>
      ) : (
        <div>
          <p className="text-gray-700">{sellerData.policies[policy]}</p>
          <button
            className="mt-2 px-4 py-2 bg-green-100 text-green-800 rounded hover:bg-green-200 transition"
            onClick={() => handleEdit(policy)}
          >
            Edit
          </button>
        </div>
      )}
    </div>
  );
}
