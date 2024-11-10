const isAdmin = (req, res, next) => {
  // Assuming user object is attached to request after authentication
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access forbidden: Admins only" });
  }
};

module.exports = isAdmin;
