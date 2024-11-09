import React from "react";

export default function ReturnHistory({ history }) {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold text-green-800 mb-4">
        Return History
      </h3>
      <ul>
        {history.map((item, index) => (
          <li
            key={index}
            className="mb-4 p-4 border rounded bg-white shadow-md"
          >
            <p className="font-semibold">{item.name}</p>
            <p className="text-sm text-gray-600">
              Returned on: {item.returnDate}
            </p>
            <p className="text-sm text-gray-600">Condition: {item.condition}</p>
            <p className="text-sm text-gray-600">Comment: {item.comment}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
