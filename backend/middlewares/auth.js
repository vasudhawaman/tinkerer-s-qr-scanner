const { validateToken } = require("../services/auth");
const jwt=require('jsonwebtoken');
const secret = "Tinkerer_Lab@123";

function checkForAuthenticationHeader() {
  return (req, res, next) => {
    // Extract the token from the specified header
    const token = req.headers['authorization'];
    console.log(token);
    if (!token) {
      // Respond with 401 Unauthorized if the token is missing
      return res.status(401).json({ error: "Authorization token is required" });
    }

    try {
      // Validate the token
      const payload = jwt.verify(token, secret);
      console.log(payload);
      req.user = payload; 
      next(); // Proceed to the next middleware/route
    } catch (error) {
      console.error("Authentication error:", error.message); // Log the error

      // Respond with 401 Unauthorized for invalid or expired tokens
      return res.status(401).json({ error: "Invalid or expired authorization token" });
    }
  };
}

module.exports = { checkForAuthenticationHeader };
