const User = require("../schema/userSchema");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function loginUser({ email, password }) {
  if (!email || !password) {
    const err = new Error("Email and password required");
    err.statusCode = 400;
    throw err;
  }

  const user = await User.findOne({ email });

  if (!user) {
    const err = new Error("User not found");
    err.statusCode = 404;
    throw err;
  }

  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    const err = new Error("Invalid password");
    err.statusCode = 401;
    throw err;
  }

  const token = jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET || "secret",
    {
      expiresIn: "7d",
    }
  );

  return {
    token,
    user: {
      id: user._id,
      email: user.email,
      name: user.firstName,
      role: user.role,
    },
  };
}

module.exports = { loginUser };
