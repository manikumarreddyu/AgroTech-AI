const express = require('express');
const router = express.Router();
const agentController = require('../../controllers/shop/sub-controllers/agentController');
const { checkAgentRole } = require('../../middleware/sub-ware/agentMiddleware');

// Routes for Agent management

// Get all agents
router.get('/agents', agentController.getAllAgents);

// Create a new agent
router.post('/agents', agentController.createAgent);

// Get agent by ID
router.get('/agents/:id', agentController.getAgentById);

// Update agent details by ID
router.put('/agents/:id', agentController.updateAgent);

// Delete agent by ID
router.delete('/agents/:id', agentController.deleteAgent);

// Assign a ticket to an agent
router.patch('/agents/:id/assign-ticket', agentController.assignTicketToAgent);

// Unassign a ticket from an agent
router.patch('/agents/:id/unassign-ticket', agentController.unassignTicketFromAgent);

// Change the status of an agent (active/inactive)
router.patch('/agents/:id/status', agentController.changeAgentStatus);

// Assign multiple tickets to an agent
router.patch('/agents/:id/assign-multiple-tickets', agentController.assignMultipleTickets);

// Role-based access check for certain admin actions
router.use('/agents/:id', checkAgentRole);

// Export the router
module.exports = router;
