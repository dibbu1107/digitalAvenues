const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if (!token) {
    return res.status(403).json({ success: false, message: 'Token not provided' });
  }

  jwt.verify(token, 'secret-key', (err, decoded) => {
    if (err) {
      return res.status(401).json({ success: false, message: 'Failed to authenticate token' });
    }

    req.decoded = decoded;
    next();
  });
};

module.exports = { verifyToken };
