console.log("AUTH CONTROLLER FILE LOADED");

const { loginUser } = require("../services/authService");

// ✅ LOGIN
async function login(req, res) {
  console.log("LOGIN CONTROLLER HIT");
  console.log("BODY:", req.body);

  try {
    const { email, password } = req.body;

    const { user, token } = await loginUser({ email, password });

    // ✅ FIXED COOKIE
    res.cookie("authToken", token, {
      httpOnly: true,
      secure: false,
      sameSite: "none", // change this
    });

    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
      data: { user },
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

// ✅ LOGOUT
async function logout(req, res) {
  console.log("cookie from frontend", req.cookies);

  // ✅ FIXED CLEAR COOKIE
  res.cookie("authToken", "", {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
    expires: new Date(0), // 🔥 important to delete
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
    error: {},
    data: {},
  });
}

module.exports = { login, logout };
