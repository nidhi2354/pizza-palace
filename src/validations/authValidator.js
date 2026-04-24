const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unauthorisedError");

async function isLoggedIn(req, res, next) {
  const token =
    req.cookies["authToken"] || req.headers.authorization?.split(" ")[1];

  console.log("TOKEN:", token);

  if (!token) {
    return res.status(401).json({
      success: false,
      data: {},
      error: "Not authenticated",
      message: "No auth token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);

    if (!decoded) {
      throw new UnAuthorisedError();
    }

    req.user = {
      email: decoded.email,
      id: decoded.id,
      role: decoded.role,
    };

    return next();
  } catch (error) {
    return res.status(error.statusCode || 401).json({
      success: false,
      data: {},
      error: error.message || "Invalid token",
      message: "Invalid token provided",
    });
  }
}

function isAdmin(req, res, next) {
  const loggedInUser = req.user;

  if (loggedInUser.role === "ADMIN") {
    return next();
  } else {
    return res.status(401).json({
      success: false,
      data: {},
      message: "You are not authorized for this action",
      error: {
        statusCode: 401,
        reason: "Unauthorized user for this action",
      },
    });
  }
}

module.exports = {
  isLoggedIn,
  isAdmin,
};
