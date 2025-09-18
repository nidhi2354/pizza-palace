const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");

async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  // console.log(token);
  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "no Auth token provided",
    });
  }

  const decoded = jwt.verify(token, JWT_SECRET);

  if (!decoded) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "Invalid  token provided",
    });
  }

  //if reached here, then user is authenticated allow them to access the api

  req.user = {
    email: decoded.email,
    id: decoded.id,
  };

  next();
}

module.exports = {
  isLoggedIn,
};
