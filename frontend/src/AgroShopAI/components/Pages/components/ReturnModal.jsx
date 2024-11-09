function ReturnModal({
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
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white p-8 rounded-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-green-800">
          Return Request
        </h2>
        <form onSubmit={handleSubmitReturn}>
          <div className="mb-4">
            <label htmlFor="returnDate" className="block text-gray-700 mb-2">
              Return Date
            </label>
            <input
              type="date"
              id="returnDate"
              value={returnDate}
              onChange={(e) => setReturnDate(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="condition" className="block text-gray-700 mb-2">
              Condition
            </label>
            <select
              id="condition"
              value={condition}
              onChange={(e) => setCondition(e.target.value)}
              className="w-full p-2 border rounded"
            >
              <option value="Good">Good</option>
              <option value="Minor Issues">Minor Issues</option>
              <option value="Needs Repair">Needs Repair</option>
              <option value="Damaged">Damaged</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="comment" className="block text-gray-700 mb-2">
              Comment (Optional)
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className="w-full p-2 border rounded"
              rows="3"
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setIsModalOpen(false)}
              className="mr-2 px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
            >
              Submit Return
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ReturnModal;
