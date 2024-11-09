import React from "react";

export default function ReturnModal({
  isModalOpen,
  setIsModalOpen,
  selectedProduct,
  handleSubmitReturn,
  returnDate,
  setReturnDate,
  condition,
  setCondition,
  comment,
  setComment,
}) {
  if (!isModalOpen || !selectedProduct) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-xl font-semibold mb-4">
          Return {selectedProduct.name}
        </h2>
        <form onSubmit={handleSubmitReturn}>
          <div className="mb-4">
            <label htmlFor="returnDate" className="block text-sm text-gray-700">
              Return Date:
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="condition" className="block text-sm text-gray-700">
              Condition:
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Good">Good</option>
              <option value="Damaged">Damaged</option>
              <option value="Broken">Broken</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm text-gray-700">
              Comment:
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="px-4 py-2 bg-gray-500 text-white rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded"
            >
              Submit Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
