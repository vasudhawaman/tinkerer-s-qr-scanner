const { validateToken } = require("../services/auth");

function checkForAuthenticationJWT(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: 'No token provided',
    });
  }

  try {

    const userPayload = validateToken(token);
    req.user = userPayload;
    next();
  } catch (error) {
    return res.status(403).json({
      success: false,
      message: 'Invalid or expired token',
    });
  }
}

module.exports = { checkForAuthenticationJWT };
