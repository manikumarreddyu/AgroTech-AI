import React from "react";

export default function TicketDetailModal({
  selectedTicket,
  setSelectedTicket,
}) {
  return (
    selectedTicket && (
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full"
        id="my-modal"
      >
        <div className="relative top-20 mx-auto p-5 border w-96 shadow-lg rounded-md bg-white">
          <div className="mt-3 text-center">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Ticket Details
            </h3>
            <div className="mt-2 px-7 py-3">
              <p className="text-sm text-gray-500">
                <strong>ID:</strong> {selectedTicket.id}
                <br />
                <strong>Subject:</strong> {selectedTicket.subject}
                <br />
                <strong>Status:</strong> {selectedTicket.status}
                <br />
                <strong>Priority:</strong> {selectedTicket.priority}
                <br />
                <strong>Description:</strong> {selectedTicket.description}
                <br />
                <strong>Created At:</strong> {selectedTicket.createdAt}
                <br />
                <strong>Agent:</strong> {selectedTicket.agent}
              </p>
            </div>
            <button
              onClick={() => setSelectedTicket(null)}
              className="mt-4 py-2 px-4 bg-green-500 text-white rounded-md"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    )
  );
}
