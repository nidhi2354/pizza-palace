const { loginUser } = require("../services/authService");

async function logout(req, res) {
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: false,
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
  return res.status(200).json({
    success: true,
    message: "Log out successfull",
    error: {},
    data: {},
  });
}

async function login(req, res) {
  try {
    const { email, password } = req.body;

    // service ab user + token dono return karegi
    const { user, token } = await loginUser({ email, password });

    // set cookie
    res.cookie("authToken", token, { httpOnly: true });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user, token },
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      data: {},
      message: error.message || "Login failed",
      error: {},
    });
  }
}

module.exports = { login, logout };
