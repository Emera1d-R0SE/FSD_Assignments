const jwt = require('jsonwebtoken');

// ─── Authenticate Middleware ──────────────────────────────────────────────────
// Reads the JWT from the Authorization header, verifies it, and attaches the
// decoded payload to req.user so that protected routes can use it.

const authenticate = (req, res, next) => {
  // The header should look like: Authorization: Bearer <token>
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  // Extract the token part after "Bearer "
  const token = authHeader.split(' ')[1];

  try {
    // Verify the token using the secret stored in .env
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach decoded user info (id and role) to the request object
    req.user = decoded;

    next(); // token is valid, move to the next handler
  } catch (err) {
    return res.status(401).json({ message: 'Invalid or expired token.' });
  }
};

// ─── Authorize Middleware ─────────────────────────────────────────────────────
// Used after authenticate. Checks whether req.user has one of the allowed roles.
// Usage: router.get('/admin', authenticate, authorize('admin'), handler)

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: 'Access forbidden. You do not have permission to perform this action.'
      });
    }
    next();
  };
};

module.exports = { authenticate, authorize };
