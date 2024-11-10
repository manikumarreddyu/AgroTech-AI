const TicketList = ({ filteredTickets, setSelectedTicket }) => (
  <div className="bg-white rounded-lg shadow-md p-6">
    <h2 className="text-xl font-semibold mb-4">Ticket List</h2>
    <div className="space-y-4">
      {filteredTickets.map((ticket) => (
        <div
          key={ticket.id}
          className="p-4 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition duration-150 ease-in-out"
          onClick={() => setSelectedTicket(ticket)}
        >
          <h3 className="font-semibold text-lg">
            #{ticket.id} - {ticket.subject}
          </h3>
          <div className="mt-2 flex flex-wrap items-center text-sm text-gray-600">
            <span className="mr-4">
              Status:{" "}
              <span
                className={`font-medium ${
                  ticket.status === "Open"
                    ? "text-red-500"
                    : ticket.status === "In-Progress"
                    ? "text-yellow-500"
                    : "text-green-500"
                }`}
              >
                {ticket.status}
              </span>
            </span>
            <span className="mr-4">Agent: {ticket.agent}</span>
            <span>Created: {ticket.createdAt}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default TicketList;
