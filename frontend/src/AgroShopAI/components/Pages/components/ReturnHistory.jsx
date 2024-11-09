
import React from "react";

const ReturnHistory = ({ history }) => {
  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold text-green-800">Return History</h3>
      {history.length === 0 ? (
        <p className="text-gray-500 mt-2">No products returned yet.</p>
      ) : (
        <ul className="mt-4 space-y-4">
          {history.map((item, index) => (
            <li key={index} className="p-4 bg-white rounded shadow-md">
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-lg font-medium text-green-700">
                    {item.name}
                  </h4>
                  <p className="text-gray-600">Model: {item.model}</p>
                </div>
                <p className="text-sm text-gray-500">
                  Returned on: {item.returnDate}
                </p>
              </div>
              <div className="mt-2">
                <p className="text-gray-700">Condition: {item.condition}</p>
                <p className="text-gray-700">
                  Comments: {item.comment || "No comments provided"}
                </p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default ReturnHistory;
