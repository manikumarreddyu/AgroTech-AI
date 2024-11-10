
import React from 'react';

export default function DeleteModal({ showDeleteModal, confirmDelete, setShowDeleteModal }) {
  return (
    showDeleteModal && (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-6 rounded-lg shadow-xl w-96">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">Confirm Deletion</h2>
          <p className="mb-6 text-gray-600">Are you sure you want to delete this item?</p>
          <div className="flex justify-end">
            <button
              className="bg-red-500 text-white px-4 py-2 rounded-md mr-2 hover:bg-red-600 transition duration-300"
              onClick={confirmDelete}
            >
              Delete
            </button>
            <button
              className="bg-gray-300 px-4 py-2 rounded-md hover:bg-gray-400 transition duration-300"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    )
  );
}
