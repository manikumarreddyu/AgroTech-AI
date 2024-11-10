const express = require("express");
const router = express.Router();
const {
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
} = require("../../controllers/shop/sub-controllers/ticketController");

// Route to create a new ticket
router.post("/tickets", createTicket);

// Route to get ticket details by ticketId
router.get("/tickets/:ticketId", getTicketDetails);

// Route to get all tickets for a user
router.get("/user/:userId/tickets", getUserTickets);

// Route to get all tickets assigned to an agent
router.get("/agent/:agentId/tickets", getAssignedTickets);

// Route to update ticket status (open, in-progress, resolved, closed)
router.put("/tickets/:ticketId/status", updateTicketStatus);

// Route to assign a ticket to a support agent
router.put("/tickets/:ticketId/assign", assignTicket);

// Route to close a ticket
router.put("/tickets/:ticketId/close", closeTicket);

// Route to delete a ticket
router.delete("/tickets/:ticketId", deleteTicket);

// Route to get all tickets (Admin only)
router.get("/tickets", getAllTickets);

// Route to update ticket priority (low, medium, high)
router.put("/tickets/:ticketId/priority", updateTicketPriority);

// Route to get tickets by status (open, in-progress, resolved, closed)
router.get("/tickets/status/:status", getTicketsByStatus);

// Route to get tickets by priority (low, medium, high)
router.get("/tickets/priority/:priority", getTicketsByPriority);

module.exports = router;
