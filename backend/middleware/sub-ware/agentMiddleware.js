const Agent = require('../models/Agent');

// Middleware to check if the agent exists
exports.checkAgentExists = async (req, res, next) => {
  try {
    const agent = await Agent.findById(req.params.id);
    if (!agent) {
      return res.status(404).json({ message: 'Agent not found' });
    }
    next();
  } catch (err) {
    res.status(400).json({ message: 'Error checking agent existence', error: err });
  }
};

// Middleware to check agent permissions (e.g., only admins can assign tickets)
exports.checkPermissions = (req, res, next) => {
  const agentRole = req.user.role; // Assuming user role is stored in the request context
  if (agentRole !== 'admin') {
    return res.status(403).json({ message: 'Permission denied' });
  }
  next();
};
