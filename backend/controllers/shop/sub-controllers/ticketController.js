const Ticket = require("../../../model/shop/sub-model/TIcket");
const User = require("../../../model/user");
const Agent = require("../models/Agent");

const asyncHandler = require("express-async-handler");

// Create a new ticket
const createTicket = asyncHandler(async (req, res) => {
  const { userId, subject, description, priority } = req.body;

  if (!userId || !subject || !description || !priority) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  const ticketId = `TKT-${Date.now()}`;

  const ticket = await Ticket.create({
    ticketId,
    userId,
    subject,
    description,
    priority,
  });

  res.status(201).json(ticket);
});

// Fetch ticket details by ticketId
const getTicketDetails = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findOne({ ticketId })
    .populate("userId")
    .populate("assignedAgentId");

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  res.status(200).json(ticket);
});

// Fetch all tickets for a user
const getUserTickets = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  const tickets = await Ticket.find({ userId }).populate("assignedAgentId");

  if (tickets.length === 0) {
    return res.status(404).json({ message: "No tickets found for this user" });
  }

  res.status(200).json(tickets);
});

// Fetch all tickets assigned to an agent
const getAssignedTickets = asyncHandler(async (req, res) => {
  const { agentId } = req.params;

  const tickets = await Ticket.find({ assignedAgentId: agentId });

  if (tickets.length === 0) {
    return res
      .status(404)
      .json({ message: "No tickets assigned to this agent" });
  }

  res.status(200).json(tickets);
});

// Update ticket status
const updateTicketStatus = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { status } = req.body;

  if (
    !status ||
    !["open", "in-progress", "resolved", "closed"].includes(status)
  ) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (
    ticket.assignedAgentId &&
    ticket.assignedAgentId.toString() !== req.user.id
  ) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this ticket" });
  }

  // Only allow status changes from 'open' to 'in-progress', 'in-progress' to 'resolved', and 'resolved' to 'closed'
  const validStatusChanges = {
    open: ["in-progress"],
    "in-progress": ["resolved"],
    resolved: ["closed"],
  };

  if (!validStatusChanges[ticket.status]?.includes(status)) {
    return res
      .status(400)
      .json({ message: `Cannot move from ${ticket.status} to ${status}` });
  }

  ticket.status = status;
  ticket.updatedAt = Date.now();

  await ticket.save();

  res.status(200).json(ticket);
});

// Assign a ticket to a support agent
const assignTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { agentId } = req.body;

  if (!agentId) {
    return res.status(400).json({ message: "Agent ID is required" });
  }

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  const agent = await Agent.findById(agentId);

  if (!agent) {
    return res.status(404).json({ message: "Agent not found" });
  }

  ticket.assignedAgentId = agentId;
  ticket.updatedAt = Date.now();

  await ticket.save();

  res.status(200).json(ticket);
});

// Close a ticket (status "closed")
const closeTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.status === "closed") {
    return res.status(400).json({ message: "Ticket is already closed" });
  }

  ticket.status = "closed";
  ticket.updatedAt = Date.now();

  await ticket.save();

  res.status(200).json(ticket);
});

// Delete a ticket (soft delete or permanent)
const deleteTicket = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  // You can choose to either permanently delete or soft delete
  await ticket.remove(); // Soft delete

  res.status(200).json({ message: "Ticket deleted successfully" });
});

// Get all tickets (Admin only)
const getAllTickets = asyncHandler(async (req, res) => {
  const tickets = await Ticket.find()
    .populate("assignedAgentId")
    .populate("userId");

  if (tickets.length === 0) {
    return res.status(404).json({ message: "No tickets found" });
  }

  res.status(200).json(tickets);
});

// Update ticket priority
const updateTicketPriority = asyncHandler(async (req, res) => {
  const { ticketId } = req.params;
  const { priority } = req.body;

  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ message: "Invalid priority level" });
  }

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  ticket.priority = priority;
  ticket.updatedAt = Date.now();

  await ticket.save();

  res.status(200).json(ticket);
});

// Fetch tickets by status
const getTicketsByStatus = asyncHandler(async (req, res) => {
  const { status } = req.params;

  if (!["open", "in-progress", "resolved", "closed"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const tickets = await Ticket.find({ status })
    .populate("assignedAgentId")
    .populate("userId");

  if (tickets.length === 0) {
    return res
      .status(404)
      .json({ message: `No tickets with status: ${status}` });
  }

  res.status(200).json(tickets);
});

// Fetch tickets by priority
const getTicketsByPriority = asyncHandler(async (req, res) => {
  const { priority } = req.params;

  if (!["low", "medium", "high"].includes(priority)) {
    return res.status(400).json({ message: "Invalid priority level" });
  }

  const tickets = await Ticket.find({ priority })
    .populate("assignedAgentId")
    .populate("userId");

  if (tickets.length === 0) {
    return res
      .status(404)
      .json({ message: `No tickets with priority: ${priority}` });
  }

  res.status(200).json(tickets);
});

module.exports = {
  createTicket,
  getTicketDetails,
  getUserTickets,
  getAssignedTickets,
  updateTicketStatus,
  assignTicket,
  closeTicket,
  deleteTicket,
  getAllTickets,
  updateTicketPriority,
  getTicketsByStatus,
  getTicketsByPriority,
};
