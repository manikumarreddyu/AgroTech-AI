const Agent = require("../../../model/shop/sub-model/Agent");
const Ticket = require("../../../model/shop/sub-model/TIcket"); // Assuming Ticket model is defined

// Create a new agent
exports.createAgent = async (req, res) => {
  try {
    const { name, email, role } = req.body;

    // Validate input
    if (!name || !email || !role) {
      return res
        .status(400)
        .json({ message: "Name, email, and role are required" });
    }

    // Check if email already exists
    const existingAgent = await Agent.findOne({ email });
    if (existingAgent) {
      return res
        .status(400)
        .json({ message: "Agent with this email already exists" });
    }

    const agent = new Agent({ name, email, role });
    await agent.save();

    res.status(201).json({ message: "Agent created successfully", agent });
  } catch (err) {
    res.status(500).json({ message: "Error creating agent", error: err });
  }
};

// Get all agents
exports.getAllAgents = async (req, res) => {
  try {
    const agents = await Agent.find();

    if (agents.length === 0) {
      return res.status(404).json({ message: "No agents found" });
    }

    res.status(200).json(agents);
  } catch (err) {
    res.status(500).json({ message: "Error fetching agents", error: err });
  }
};

// Get agent by ID
exports.getAgentById = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent);
  } catch (err) {
    res.status(400).json({ message: "Invalid agent ID", error: err });
  }
};

// Update agent by ID
exports.updateAgent = async (req, res) => {
  try {
    const { name, email, role, status } = req.body;

    // Ensure at least one field to update is provided
    if (!name && !email && !role && !status) {
      return res.status(400).json({ message: "No fields provided to update" });
    }

    const agent = await Agent.findByIdAndUpdate(
      req.params.id,
      { name, email, role, status },
      { new: true, runValidators: true }
    );

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    res.status(200).json(agent);
  } catch (err) {
    res.status(500).json({ message: "Error updating agent", error: err });
  }
};

// Delete agent by ID
exports.deleteAgent = async (req, res) => {
  try {
    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Ensure agent is not assigned to any active tickets before deletion
    if (agent.assigned_tickets.length > 0) {
      return res
        .status(400)
        .json({
          message: "Agent cannot be deleted as they have active tickets",
        });
    }

    await Agent.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Agent deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting agent", error: err });
  }
};

// Assign a ticket to an agent
exports.assignTicketToAgent = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const agent = await Agent.findById(req.params.id);
    const ticket = await Ticket.findById(ticketId);

    // Check if agent and ticket exist
    if (!agent || !ticket) {
      return res.status(404).json({ message: "Agent or Ticket not found" });
    }

    // Check if agent is inactive
    if (agent.status === "inactive") {
      return res
        .status(400)
        .json({ message: "Cannot assign ticket to an inactive agent" });
    }

    // Prevent assigning ticket if it is already assigned
    if (ticket.status === "assigned") {
      return res
        .status(400)
        .json({ message: "Ticket is already assigned to another agent" });
    }

    // Assign the ticket to the agent
    agent.assigned_tickets.push(ticketId);
    await agent.save();

    // Update ticket status to 'assigned'
    ticket.status = "assigned";
    await ticket.save();

    res
      .status(200)
      .json({ message: "Ticket assigned to agent successfully", agent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning ticket to agent", error: err });
  }
};

// Unassign a ticket from an agent
exports.unassignTicketFromAgent = async (req, res) => {
  try {
    const { ticketId } = req.body;
    const agent = await Agent.findById(req.params.id);
    const ticket = await Ticket.findById(ticketId);

    // Check if agent and ticket exist
    if (!agent || !ticket) {
      return res.status(404).json({ message: "Agent or Ticket not found" });
    }

    // Check if the ticket is assigned to this agent
    if (!agent.assigned_tickets.includes(ticketId)) {
      return res
        .status(400)
        .json({ message: "Ticket is not assigned to this agent" });
    }

    // Remove ticket from agent's assigned tickets
    agent.assigned_tickets = agent.assigned_tickets.filter(
      (id) => id.toString() !== ticketId
    );
    await agent.save();

    // Update ticket status to 'unassigned'
    ticket.status = "unassigned";
    await ticket.save();

    res
      .status(200)
      .json({ message: "Ticket unassigned from agent successfully", agent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error unassigning ticket from agent", error: err });
  }
};

// Change the status of an agent (active/inactive)
exports.changeAgentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    // Ensure status is valid
    if (!["active", "inactive"].includes(status)) {
      return res
        .status(400)
        .json({ message: "Invalid status value, must be active or inactive" });
    }

    const agent = await Agent.findById(req.params.id);

    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    agent.status = status;
    await agent.save();

    res
      .status(200)
      .json({ message: `Agent status updated to ${status}`, agent });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error changing agent status", error: err });
  }
};

// Assign multiple tickets to an agent
exports.assignMultipleTickets = async (req, res) => {
  try {
    const { ticketIds } = req.body; // Expecting an array of ticket IDs
    const agent = await Agent.findById(req.params.id);

    // Check if agent exists
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    // Validate ticket IDs
    const tickets = await Ticket.find({ _id: { $in: ticketIds } });

    // Ensure all ticket IDs are valid
    if (tickets.length !== ticketIds.length) {
      return res.status(400).json({ message: "Some tickets were not found" });
    }

    // Check if any ticket is already assigned
    const assignedTickets = tickets.filter(
      (ticket) => ticket.status === "assigned"
    );
    if (assignedTickets.length > 0) {
      return res
        .status(400)
        .json({ message: "Some tickets are already assigned" });
    }

    // Assign tickets to agent
    agent.assigned_tickets.push(...ticketIds);
    await agent.save();

    // Update ticket status to 'assigned'
    for (let ticket of tickets) {
      ticket.status = "assigned";
      await ticket.save();
    }

    res
      .status(200)
      .json({
        message: "Multiple tickets assigned to agent successfully",
        agent,
      });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error assigning multiple tickets", error: err });
  }
};

// Handle Agent Role-based Access (admin vs support)
exports.checkAgentRole = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: "Agent not found" });
    }

    if (agent.role !== "admin") {
      return res
        .status(403)
        .json({
          message: "Permission denied, only admin can perform this action",
        });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: "Error checking agent role", error: err });
  }
};
