const User = require("../model/user");

exports.getUserByID =async (req, res) => {
    try {
      const user = await User.findById(req.params.id);
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      res.json(user);
    } catch (error) {
      console.error("Error fetching user:", error);
      res.status(500).json({ message: 'Server error' });
    }
  }

  exports.deleteUnverifiedUsers = async () => {
    try {
      const now = new Date();
      const expirationTime = new Date(now.getTime() - 24 * 60 * 60 * 1000); // 24 hours ago
  
      const deletedUsers = await User.deleteMany({
        isVerified: false,
        createdAt: { $lt: expirationTime }
      });
  
      console.log(`Deleted ${deletedUsers.deletedCount} unverified accounts older than 24 hours`);
    } catch (error) {
      console.error('Error deleting unverified accounts:', error);
    }
  };

