import React, { useState, useEffect } from "react";
import TicketForm from "./TicketForm";
import ConfirmationMessage from "./ConfirmationMessage";
import TicketFilters from "./TicketFilters";
import TicketList from "./TicketList";
import TicketDetailModal from "./TicketDetailModal";
import HeaderBanner from "./Ticketbanner";
// Dummy ticket data
const dummyTickets = [
  { id: 'T001', subject: 'Order Delay', status: 'Open', priority: 'High', agent: 'John Doe', createdAt: '2023-05-10 09:30' },
  { id: 'T002', subject: 'Product Inquiry', status: 'In-Progress', priority: 'Medium', agent: 'Jane Smith', createdAt: '2023-05-09 14:15' },
  { id: 'T003', subject: 'Refund Request', status: 'Resolved', priority: 'Low', agent: 'Mike Johnson', createdAt: '2023-05-08 11:45' },
];

export default function SupportPage() {
  const [newTicket, setNewTicket] = useState({
    subject: "",
    description: "",
    priority: "Low",
  });
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [newTicketId, setNewTicketId] = useState(null);
  const [filterStatus, setFilterStatus] = useState("All");
  const [filterPriority, setFilterPriority] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [tickets, setTickets] = useState(dummyTickets); // Set initial tickets from dummyTickets
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // To store the selected file

  const handleInputChange = (e) => {
    setNewTicket({ ...newTicket, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file); // Store the selected file in state
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTicketData = {
      ...newTicket,
      id: `T${String(tickets.length + 1).padStart(3, '0')}`, // Generate a readable ticket ID
      status: "Open", // Default status
      agent: "Unassigned", // Placeholder for agent
      createdAt: new Date().toLocaleString(), // Current date and time
      file: selectedFile, // Attach the file to the new ticket
    };
    setTickets([newTicketData, ...tickets]);
    setNewTicketId(newTicketData.id);
    setShowConfirmation(true);
    setNewTicket({ subject: "", description: "", priority: "Low" });
    setSelectedFile(null); // Clear the file after submission
  };

  const filteredTickets = tickets.filter((ticket) => {
    const statusMatch =
      filterStatus === "All" || ticket.status === filterStatus;
    const priorityMatch =
      filterPriority === "All" || ticket.priority === filterPriority;
    const searchMatch =
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      ticket.id.toString().includes(searchTerm);
    return statusMatch && priorityMatch && searchMatch;
  });

  return (
    <div className="container mx-auto px-4 py-6 mt-20 pt-15">
        <HeaderBanner/>
      <TicketForm
        newTicket={newTicket}
        handleInputChange={handleInputChange}
        handleFileChange={handleFileChange}
        handleSubmit={handleSubmit}
      />
      <ConfirmationMessage
        showConfirmation={showConfirmation}
        newTicketId={newTicketId}
        setShowConfirmation={setShowConfirmation}
      />
      <TicketFilters
        filterStatus={filterStatus}
        setFilterStatus={setFilterStatus}
        filterPriority={filterPriority}
        setFilterPriority={setFilterPriority}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <TicketList filteredTickets={filteredTickets} setSelectedTicket={setSelectedTicket} />
      <TicketDetailModal selectedTicket={selectedTicket} setSelectedTicket={setSelectedTicket} />
    </div>
  );
}
