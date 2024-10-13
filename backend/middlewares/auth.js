const { validateToken } = require("../services/auth");
const User=require("../model/user");

function checkForAuthenticationCookie(cookieName) {
  return (req, res, next) => {
    const tokenCookieValue = req.cookies[cookieName];
    if (!tokenCookieValue) {
      return next();
    }
    try {
      const userPayLoad = validateToken(tokenCookieValue);
      req.user = userPayLoad;
    } catch (error) {}
      return next();
  };
}
function isAdmin(req, res, next) {
  if(User.findOne({email: req.body.email}).isAdmin){
    return next();
  }
  return res.status(404).send("Page not found");
}

module.exports = {checkForAuthenticationCookie, isAdmin};