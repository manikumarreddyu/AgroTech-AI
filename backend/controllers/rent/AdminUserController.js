
const User = require('../../model/user');

exports.createUser = async (req, res) => {
    try {
      const { firstName, lastName, username, email, password, role, address } = req.body;
      
      // Check for required fields
      if (!firstName || !lastName || !username || !email || !password || !role) {
        return res.status(400).json({ message: 'All fields are required' });
      }
      
      const newUser = new User({ firstName, lastName, username, email, password, role, address });
      await newUser.save();
      
      res.status(201).json({ message: 'User created successfully', user: newUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error creating user' });
    }
  };
  

  exports.updateUser = async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(userId, updates, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json({ message: 'User updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user' });
    }
  };

  
  exports.deleteUser = async (req, res) => {
    try {
      const { userId } = req.params;
      
      const deletedUser = await User.findByIdAndDelete(userId);
      if (!deletedUser) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json({ message: 'User deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error deleting user' });
    }
  };

  
  exports.getUserById = async (req, res) => {
    try {
      const { userId } = req.params;
      
      const user = await User.findById(userId);
      if (!user) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json({ user });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching user details' });
    }
  };

  
  exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find({});
      res.status(200).json({ users });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error fetching users' });
    }
  };

  
  exports.updateUserRole = async (req, res) => {
    try {
      const { userId } = req.params;
      const { role } = req.body;
      
      const allowedRoles = ['admin', 'farmer', 'vendor', 'customer'];
      if (!allowedRoles.includes(role)) {
        return res.status(400).json({ message: 'Invalid role' });
      }
      
      const updatedUser = await User.findByIdAndUpdate(userId, { role }, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      
      res.status(200).json({ message: 'User role updated successfully', user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating user role' });
    }
  };

  
  exports.toggleUserStatus = async (req, res) => {
    try {
      const { userId } = req.params;
      const { isVerified } = req.body;
      
      const updatedUser = await User.findByIdAndUpdate(userId, { isVerified }, { new: true });
      if (!updatedUser) return res.status(404).json({ message: 'User not found' });
      
      const status = isVerified ? 'activated' : 'suspended';
      res.status(200).json({ message: `User account ${status}`, user: updatedUser });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Error updating account status' });
    }
  };
  