const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/serverConfig");
const UnAuthorisedError = require("../utils/unauthorisedError"); // custom error

// Middleware to check if user is logged in
async function isLoggedIn(req, res, next) {
  const token = req.cookies["authToken"];
  console.log(token);
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

    //if reached here, then user is authenticated allow them to access the api

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

// this function checks if the authenticated user is an  admin or not?

//because we will call isAdmin after isLoggedIn thats why we will receive user details

function isAdmin(req, res, next) {
  const loggedInUser = req.user;

  console.log(loggedInUser);
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
