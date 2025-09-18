const { loginUser } = require("../services/authService");

async function login(req, res) {
  try {
    // auth service
    const loginPayLoad = req.body;

    const response = await loginUser(loginPayLoad);

    res.cookie("authToken", response, {
      httpOnly: true,
      secure: false,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: {},
      error: {},
    });
  } catch (error) {
    return res.status(error.statusCode || 500).json({
      success: false,
      data: {},
      message: error.message,
      error: error,
    });
  }
}

module.exports = {
  login,
};
