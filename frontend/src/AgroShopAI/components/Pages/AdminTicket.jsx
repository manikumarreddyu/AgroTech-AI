import React, { useState } from "react";
import Header from "./THeader";
import SearchAndFilter from "./TSearchAndFilter";
import TicketList from "./AdminTicketList";
import TicketDetails from "./AdminTicketDetails";

const dummyTickets = [
  {
    id: 1,
    subject: "Order not received",
    status: "Open",
    agent: "John Doe",
    createdAt: "2023-05-15",
    priority: "High",
    description:
      "I placed an order for fertilizer 5 days ago and haven't received it yet.",
    user: "farmer@example.com",
  },
  {
    id: 2,
    subject: "Wrong seeds delivered",
    status: "In-Progress",
    agent: "Jane Smith",
    createdAt: "2023-05-14",
    priority: "Medium",
    description: "I ordered tomato seeds but received cucumber seeds instead.",
    user: "gardener@example.com",
  },
  {
    id: 3,
    subject: "Pesticide information needed",
    status: "Open",
    agent: "Unassigned",
    createdAt: "2023-05-13",
    priority: "Low",
    description:
      "I need more information about the organic pesticides you offer.",
    user: "organic@example.com",
  },
  {
    id: 4,
    subject: "Billing discrepancy",
    status: "Open",
    agent: "Bob Johnson",
    createdAt: "2023-05-12",
    priority: "High",
    description: "I was charged twice for my last order of plant pots.",
    user: "plantlover@example.com",
  },
  {
    id: 5,
    subject: "Product quality issue",
    status: "In-Progress",
    agent: "Jane Smith",
    createdAt: "2023-05-11",
    priority: "Medium",
    description:
      "The soil I received seems to be of lower quality than advertised.",
    user: "gardenexpert@example.com",
  },
];

const TicketManagement = () => {
  const [tickets, setTickets] = useState(dummyTickets);
  const [selectedTicket, setSelectedTicket] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");

  const filteredTickets = tickets.filter((ticket) => {
    return (
      ticket.subject.toLowerCase().includes(searchTerm.toLowerCase()) &&
      (statusFilter === "All" || ticket.status === statusFilter) &&
      (priorityFilter === "All" || ticket.priority === priorityFilter)
    );
  });

  const updateTicketStatus = (id, newStatus) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, status: newStatus } : ticket
      )
    );
  };

  const assignTicket = (id, agent) => {
    setTickets(
      tickets.map((ticket) =>
        ticket.id === id ? { ...ticket, agent } : ticket
      )
    );
  };

  return (
    <div className="container mx-auto">
      <Header />
      <SearchAndFilter
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        priorityFilter={priorityFilter}
        setPriorityFilter={setPriorityFilter}
      />
      <div className="flex">
        <div className="w-1/2 pr-4">
          <TicketList
            filteredTickets={filteredTickets}
            setSelectedTicket={setSelectedTicket}
          />
        </div>
        <div className="w-1/2 pl-4">
          <TicketDetails
            selectedTicket={selectedTicket}
            updateTicketStatus={updateTicketStatus}
            assignTicket={assignTicket}
          />
        </div>
      </div>
    </div>
  );
};

export default TicketManagement;
