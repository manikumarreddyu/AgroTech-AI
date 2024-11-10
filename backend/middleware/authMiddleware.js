const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    console.error("Authorization token missing from request headers");
    return res.status(403).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      console.error(`JWT verification failed: ${err.message}`, { token });

      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token has expired" });
      }
      if (err.name === "JsonWebTokenError") {
        return res.status(401).json({ message: "Invalid token" });
      }

      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = decoded;

    next();
  });
};

module.exports = authMiddleware;
