const Ticket = require("../models/Ticket");

// Middleware to ensure only the user who created the ticket can update it
const checkTicketOwnership = async (req, res, next) => {
  const { ticketId } = req.params;

  const ticket = await Ticket.findOne({ ticketId });

  if (!ticket) {
    return res.status(404).json({ message: "Ticket not found" });
  }

  if (ticket.userId.toString() !== req.user.id) {
    return res
      .status(403)
      .json({ message: "You are not authorized to update this ticket" });
  }

  next();
};

module.exports = { checkTicketOwnership };
