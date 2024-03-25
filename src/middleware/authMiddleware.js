// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(401).json({
      status: false,
      message: 'No token provided',
      result: null,
    });
  }

  jwt.verify(token, 'your_secret_key', (err, decoded) => {
    if (err) {
      return res.status(403).json({
        status: false,
        message: 'Failed to authenticate token',
        result: null,
      });
    }

    // Check if user role is 'admin'
    if (decoded.role !== 'admin') {
      return res.status(403).json({
        status: false,
        message: 'Insufficient permissions',
        result: null,
      });
    }

    // If token is valid and user role is 'admin', proceed to the next middleware
    next();
  });
}

module.exports = { verifyToken };
