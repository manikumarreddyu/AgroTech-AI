import React from "react";

export default function ConfirmationMessage({
  showConfirmation,
  newTicketId,
  setShowConfirmation,
}) {
  return (
    showConfirmation && (
      <div
        className="mb-8 bg-green-100 border-l-4 border-green-500 text-green-700 p-4"
        role="alert"
      >
        <p className="font-bold">Ticket Submitted Successfully!</p>
        <p>Your ticket ID is: {newTicketId}</p>
        <button
          onClick={() => setShowConfirmation(false)}
          className="mt-2 text-sm text-green-800 hover:text-green-900"
        >
          Close
        </button>
      </div>
    )
  );
}
