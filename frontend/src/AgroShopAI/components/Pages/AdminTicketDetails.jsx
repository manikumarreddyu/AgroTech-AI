const TicketDetails = ({
  selectedTicket,
  updateTicketStatus,
  assignTicket,
}) => {
  if (!selectedTicket)
    return <p className="text-gray-600">Select a ticket to view details</p>;

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">
        #{selectedTicket.id} - {selectedTicket.subject}
      </h3>
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <p className="font-medium">User:</p>
          <p>{selectedTicket.user}</p>
        </div>
        <div>
          <p className="font-medium">Status:</p>
          <p
            className={`${
              selectedTicket.status === "Open"
                ? "text-red-500"
                : selectedTicket.status === "In-Progress"
                ? "text-yellow-500"
                : "text-green-500"
            }`}
          >
            {selectedTicket.status}
          </p>
        </div>
        <div>
          <p className="font-medium">Priority:</p>
          <p>{selectedTicket.priority}</p>
        </div>
        <div>
          <p className="font-medium">Agent:</p>
          <p>{selectedTicket.agent}</p>
        </div>
        <div>
          <p className="font-medium">Created:</p>
          <p>{selectedTicket.createdAt}</p>
        </div>
      </div>
      <div className="mb-4">
        <p className="font-medium">Description:</p>
        <p className="mt-1 text-gray-600">{selectedTicket.description}</p>
      </div>

      <div className="mb-4">
        <h4 className="font-semibold mb-2">Update Status:</h4>
        <div className="flex space-x-2">
          <button
            className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition duration-150 ease-in-out"
            onClick={() => updateTicketStatus(selectedTicket.id, "Open")}
          >
            Open
          </button>
          <button
            className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600 transition duration-150 ease-in-out"
            onClick={() => updateTicketStatus(selectedTicket.id, "In-Progress")}
          >
            In-Progress
          </button>
          <button
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition duration-150 ease-in-out"
            onClick={() => updateTicketStatus(selectedTicket.id, "Resolved")}
          >
            Resolved
          </button>
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-2">Assign Agent:</h4>
        <select
          className="w-full p-2 border border-gray-300 rounded"
          value={selectedTicket.agent}
          onChange={(e) => assignTicket(selectedTicket.id, e.target.value)}
        >
          <option value="Unassigned">Unassigned</option>
          <option value="John Doe">John Doe</option>
          <option value="Jane Smith">Jane Smith</option>
          <option value="Bob Johnson">Bob Johnson</option>
        </select>
      </div>
    </div>
  );
};

export default TicketDetails;
